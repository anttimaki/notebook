# PostgresSQL - Up And Running

* **Book**: [PostgreSQL: Up and Running](https://www.oreilly.com/library/view/postgresql-up-and/9781449326326/) (3rd edition)
* **Authors**: Regina O. Obe, Leo S. Hsu
* **Date read**: 03-08-2021

## Chapter 1. The Basics

### Why PostgreSQL?

* Enterprise-class relational database management system.
* Fast
* Supports writing functions in multiple languages.
* Large built-in data type set, supports creating new ones.
* JSON and JSONB types support document-oriented approach.
* Open source.

### Why not PostgreSQL?

* Typical installation sans extensions is 100MB.
* Availability on shared hosting environments.

### Administration tools

* `psql`: (interactive) CLI.
* `pgAdmin`: free GUI tool.
* `phpPgAdmin`: free web-based GUI tool.
* `Adminer`: for multi-DBMS environments.

### PostgresSQL Database Objects

* Each service instance contains multiple `databases`.
* `Schemas` can be used to organize a database to subsection.
  * `Public` schema is created by default and might be enough for small DB.
* In PostgreSQL, `tables` are inheritable and have their own custom data types.
* `Views` can be used to read - and in some cases update - a subset of data from one or more tables.
* `Materialized views` can also cache data to speed up read operations.
* `Extensions` can be used to augment Postgres in many ways.
  * Only enable extensions to databases that actually use them.
  * Use separate schemas for extensions to keep things tidy.
* Custom `functions` can be written in many `languages` and used to handle data manipulation or complex calculations.
* PostgreSQL allows you to define how default operators (e.g. `+`) works for your custom data types.
  * You can even introduce your own `operators`.
* `Foreign tables` are external data sources, that can be accessed like tables within the database.
* Custom `trigger functions` can react to events in the database.
* PostgreSQL support `composite types` made up of basic types.
  * PostgreSQL automatically creates a new composite type for each table, based on its structure.
* `Casts` are used to convert data between types.
* `Sequences` control the autoincrementation of serial data types.
  * Since sequences are objects, they can be shared between tables.

## Chapter 2. Database Administration

### Configuration Files

* `posgresql.conf` controls general settings such as memory allocation, storage and log location and IP addresses.
  * Executing e.g. `ALTER SYSTEM SET work_mem='500MB';` creates `postgresql.auto.conf`.
  * Use `SELECT pg_reload_conf();` to make changes take effect. 
* `pg_hba.conf` controls server access, such as users and IP addresses.
  * Rules are checked from top down and the first match takes effect, so the order is significant.
  * Authentication methods:
    * `trust` allows connection without further verification.
    * `md5` and `password ` require an encrypted or clear-text password to connect.
    * `ident` checks if OS user has access, see `pg_ident.conf` below.
    * `peer` uses the OS user - only allowed for local connections.
    * `cert` requires SSL connection with a valid certificate.
    * Other methods are also available.
* `pg_ident.conf` can be used to map authenticated OS logins to PostgreSQL users.
* In case of problems, check `pg_log` folder for clues.

### Managing Connections

* Cancel active queries e.g. before backup/restore.
* To cancel queries and terminate connections:
  1. Get recent connections: `SELECT * FROM pg_stat_activity;`
  2. Cancel active queries by given PID: `SELECT pg_cancel_backend(1234);`
  3. Terminate connection by given PID: `SELECT pg_terminate_backend(1234);`
    * Will automatically cancel all queries of the given connection.
* Settings such as `statement_timeout` can be used to cancel queries automatically.

### Roles

* `Login roles` support logging in.
  * `CREATE ROLE autti LOGIN PASSWORD 'pass' VALID UNTIL 'infinity' CREATEDB;`
    * User can login and create new databases.
  * `CREATE ROLE autti LOGIN PASSWORD 'pass' VALID UNTIL '2022-01-01' SUPERUSER;`
    * User can login and grant superuser status to others.
* `Group roles` can contain other roles.
  * `CREATE ROLE master INHERIT; GRANT master TO autti;`
    * INHERIT causes members to automatically get all privileges of the role, excluding superuser privilege.
  * `CREATE ROLE supes SUPERUSER; SET ROLE supes;`
    * SET ROLE grants authenticated user all group privileges, including SUPERUSER, for the duration of the session.

### Database Creation

* `CREATE DATABASE mydb TEMPLATE my_template;` creates a database based on `my_template`.
  * `Template database` defines settings and data that's copied to newly created databases.
  * If TEMPLATE is omitted, `template1` provided by PostgreSQL is used.
* `template0` is also provided by default - treat it as a backup and never edit it.
  * Changing encoding or collation requires creating a database based on `template0`.
* Any existing database can be used as a template, e.g. when creating replicas.

#### Using Schemas

* Use schemas to organize database to logical groups.
* Names need to be unique only within schemas.
* Create schemas based on roles to keep data separate in multi-client environment.
  * Using setting `search_path = "$user", public;` causes searches to always check for a table in the schema that has the same name as the authenticated user.
* Consider giving extensions their own schemas.

### Privileges

* PostgreSQL supports privileges down to column and row level.
* There's a few dozen privileges, e.g. SELECT, ALTER and EXECUTE.
  * Most privileges also require context, i.e. which tables role can ALTER.
* GRANT is the primary means to assign privileges
  * Granter must have GRANT privilege, as well as the privilege being granted.
  * Some privileges always remain on the owner of an object and can't be granted to others.
  * Owning an object (e.g. database) doesn't guarentee ownership of its childs (e.g. schemas).
  * Use ALL to grant all privileges or to all object: `GRANT ALL ON ALL TABLES IN SCHEMA my_schema TO my_user;`.
  * Use PUBLIC to grant to all roles: `GRANT USAGE ON SCHEMA my_schema TO PUBLIC;`.
  * Use REVOKE to revoke privileges: `REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA my_schema FROM PUBLIC;`.
* DEFAULT PRIVILEGES grants privileges to all future objects (but not existing ones).
  * `ALTER DEFAULT PRIVILEGES IN SCHEMA my_schema GRANT SELECT TO PUBLIC;`

### Extensions

* `\dx` to list installed extensions, `\dx+ extension_name` for details.
* Extension needs to be installed first on the server (varies by OS), then on the target database (`CREATE EXTENSION extension_name SCHEMA my_extensions;`).
* Popular extensions:
  * `btree_gin`: GIN index for b-tree data types.
  * `postgis`: for spatial data.
  * `pgcrypto`: encryption tools.

### Managing Disk Storage With Tablespaces

* `Tablespaces` give logical names to physical locations on disks.
* `pg_default` contains user data, `pg_global` system data.
* `CREATE TABLESPACE myspace LOCATION 'C:/myspace';`
  * Postgre service needs full access to the physical folder.
  * `ALTER DATABASE mydb SET TABLESPACE myspace;`

### Verboten Practices

1. Don't delete PostgreSQL system files and binaries
    * Pruning `pg_log` is ok, but `pg_xlog` (or `pg_wal`, the transaction logs) and `pg_clog` (or `pg_xact`, the active commit log) are off limits.
2. Don't grant root privileges to postgres system account
    * `postgres` account should be regular user with data cluster and tablespace folders.
    * Some use cases (e.g. FDW) may require read/write/delete permissions in other places too.
3. Don't set `shared_buffers` too high
    * May lead to instability, especially with older versions.
4. Don't try to start PostgreSQL on a port already in user
    * In case of errors you may need to remove `postgresql.pid` lock file.

## Chapter 3. psql

* CLI utility for running queries, execute queries, import/export data, database administration and generate reports.
* Use `PGHOST`, `PGPORT`, `PGUSER` and `PGPASSWORD` env variables to avoid having to type them.
* Run script file: `psql -f myscript`.
* Run query without starting interactive mode: `psql -d mydb -c "DROP TABLE IF EXISTS mytable;"`.
* Edit `~/.psqlrc` to customize settings.
* `\timing` to toggle displaying time it took to execute query.
* By default, autocommit is on, disable with `\set AUTOCOMMIT off`.
* Create shortcuts: `\set eav 'EXPLAIN ANALYZE VERBOSE'`.
  * Call with colon: `:eav SELECT * FROM mytable;`.
* Run shell commands in interactive mode: `\! ls`.
* Run latest query on intervals: `\watch 10`.

## Chapter 4. pgAdmin

## Chapter 5. Data Types

### Numerics

* `integer`s, `decimal`s, `float`ing point numbers.
* `serial` and `bigserial` - autoincrementing integers.
  * Next value for the integer column is read from auto-generated sequence object.
  * Sequence can be ALTERed, ie. current value, boundaries and incrementation step.

### Textuals

* `char` - for fixed length values.
  * PostgreSQL automatically rightpads shorter values with spaces.
  * Has no speed benefits and takes more space than other textuals.
* `varchar` - for varying length texts with maximum length.
  * Limiting the length might improve code readability by giving an idea what goes into the field.
* `text`
  * It's rather safe to use text instead of varchar categorically.
    * It's just as fast as varchar if not faster.
* Functions for padding, trimming, concatenation, splitting, substringing and are provided.
* Regexp for e.g. replacing and matching.
* SIMILAR TO operator (`~`): `SELECT description FROM mytable WHERE description ~ E'[0-9]{6}-[0-9]{3}[0-9,A-Z]{1}';`

### Temporals

* `date`: tz-unaware date (no time).
* `time`: tz-unaware time (no date).
* `timetz`: assumes DST of the current date as the tz.
* `timestamp` and `timestamptz`: datetime.
* `interval`: duration in varying units, handy for arithmetics.
* `tsrange` and `tstzrange`: opened/closed range for two timestamps.
* `daterange`: opened/closed range for two dates.

#### Time Zones: What They Are and Are Not

* Tz-aware values are always stored as UTC, PostgreSQL calculates the UTC value automatically if other tz is given.
* When displaying the value:
  1. Determine what the target tz is.
    * Use first tz available: session, user, database, server tz.
  2. Compute offset betweet UTC and target tz.
  3. Add offset to datetime.
  4. Display the offset datetime with timezone indicator.

#### Datetime Operators and Functions

* `SELECT '2021-10-10 10:00'::timestamp + interval '1 hour';`
* `SELECT '23 hours 20 minutes'::interval - '1 hour'::interval;`
* ```SQL
  SELECT
    ('2021-10-10 0:00'::timestamp, '2021-10-10 23:59'::timestamp)
  OVERLAPS
    ('2021-10-10 12:00'::timestamp, '2021-10-10 13:00'::timestamp)
  AS conflict
  ```

### Arrays

* Every data type has a corresponding array type
* Handy for aggregate functions, IN and ANY clauses etc.
* Index starts from 1.
* Creating arrays:
  * Manual construction: `SELECT ARRAY[2021, 2022] AS years;`.
  * Function construction: `SELECT array(SELECT DISTINCT purchase_year FROM PURCHASES) AS years;`.
  * Casting: `SELECT '{2021, 2022}'::integer[] AS years;`.
  * Helpers: `SELECT string_to_array('2021;2022', ';') AS years;`.
* Arrays to rows: `SELECT unnest(ARRAY[2021, 2022]) AS years;`.
* Slicing with start:end syntax: `SELECT my_array_field[2:4] FROM foo;`.
* Concatenate with `||`: `SELECT my_array_field[1:1] || my_array_field[3:3] FROM foo;`.
  * `SELECT '{1,2,3}'::integer[] || 4;`
* Referencing with `[index]`: `SELET my_array_field[1] FROM foo;`.
  * No index errors, NULL is returned instead.
* Comparison operators support arrays.
  * Comparison operators can utilize GiST and GIN indexes.
  * Equal operator `=` returns true if all elements are equal and in same order.
  * Overlap operator `&&` returns true if arrays have any common items.
  * Contains operator `@>` returns true if one array contains all the items in other.

### Range Types

* Allows defining a range in a single field.
* E.g. `[-2, 2)` means all integers from -2 to 2, but not including 2.
  * Using this approach where left side is "closed end" and right side is "open end" is considered canonical.
    * Using it consistently makes it easier to compare values.
    * PostgreSQL canonicalizes all discrete ranges automatically.
* Discrete ranges: `int4range`, `int8range`, `daterange`.
* Continuous ranges: `numrange`, `tsrange`, `tstzrange`.
* For numeric data types, if left/right side is left empty or null, it's replaced with smallest/biggest value supported by data type.
* For temporal data types, if left/right side is left empty or null, it's replaced with -infinity/infinity.
* `SELECT '[2021-01-01, 2021-12-31]'::daterange;`
* `SELECT '(0, )'::int8range;`
* `SELECT '[-infinity, infinity)'::daterange;`
* `SELECT daterange('2021-01-01', '2021-12-31', '[]');`
  * Last parameter defined open/closed endedness.
* Overlap `&&` and contains `@>` operators are supported, among others.

### JSON

* PostgreSQL automatically validates JSON, invalid data can't be stored nor cast.
* Querying JSON data:
  * Pointer symbol: `SELECT person->'children'->0->'name' FROM persons;`.
    * Returned value is primitive (number, string, boolean). To return text presentation, use `->>` as the last operator.
  * Path array: `SELECT person#>array['children', '0', 'name'] FROM persons;`.
* Use `row_to_json` to return results as JSON objects.

#### Binary JSON: jsonb

* Stored as binary: the original formatting, order of attributes etc. may change.
  * Better performance since no need to reparse for each query.
* Supports same operators and has similar helper functions as regular `json`.
* Additional operators: equality `=`, contains `@>`, key exists `?`, any of array keys exists `?|`, all array keys exists `?&`.
* Duplicate keys are not allowed, one is picked silently.
* Columns can be indexed with GIN index.

Additional operators for jsonb concatenation `||` and substraction `-`/`#-`. Since duplicate keys are not supported, concatenation can be used to update existing values.

```SQL
UPDATE persons
SET person = person || '{"nickname": "Nick"}'
WHERE person @> '{"name": "Nicolas"}';

UPDATE persons
SET person = person - 'nickname'
WHERE person @> '{"name": "Nicolas"}';
```

### XML

* PostgreSQL supports generating, manipulating and parsing XML.
* No support for indexing.
* Data is automatically validated to be XML, but DTD nor schema is checked.
* Simple constraing check for structure can be added to table.
* `xpath` function can be used to query the data with XPath strings.

### Full Text Search

* Use natural language-based match conditions when searching from text.
* One or more dictionaries that equate:
  * Words: love, romance, lust
  * Stems: love, loving, loved
  * Stopwords to be ignored: a, the, on
* Rank search results based on proximity of words or frequency of terms, instead of using fixed ordering.
* Show available FTS configurations: `SELECT cfgname FROM pg_ts_config;`.
  * E.g. Finnish is supported by default.
  * New configurations and dictionaries can be created.
  * Community provides lots of ready-made configs which are easy to install.
* Show current config: `SHOW default_text_search_config;`.
* Change config: `ALTER DATABASE mydb SET default_text_search_config = 'some_config';`.

#### TSVectors

* Text columns must be `vectorized` before FTS can search them.
* Vectorizing creates column of `tsvector` data type.

```SQL
CREATE TABLE mytable (id serial PRIMARY KEY, title text, description text, fts tsvector);
CREATE INDEX ix_mytable_fts_gin ON mytable USING gin(fts);

/* Once data has been added to table, vectorize it: */
UPDATE mytable
SET fts =
  /* Set "weight" of column to 'A', 'B', 'C' or 'D'. */
  setweight(to_tsvector(COALESCE(title, '')), 'A')
  ||  /* TSVectors can be created by concatenating existing vector. */
  setweight(to_tsvector(COALESCE(description, '')), 'B');

/* Handle updating vectors with a trigger. */
CREATE TRIGGER trig_tsv_mytable
BEFORE INSERT OR UPDATE OF title, description
ON mytable
FOR EACH ROW EXECUTE PROCEDURE
  tsvector_update_trigger(fts, 'pg_catalog.english', title, description);
```

#### TSQueries

* In addition to vectorizing the searched text, also search terms need to be vectorized.
* Search term can contains ANDs `&` and ORs `|`: `'fun & games'`.
* `to_tsquery()` is the simplest method to vectorize search terms.
* `plainto_tsquery()` a: utomatically uses AND to join words in search term.
* `phraseto_tsquery()` supports searching multiple words and takes the distance between them into account.
* TSQueries themselves can be joined with ANDs `&&` and ORs `||`.
  * `plainto_tsquery('fun games') || to_tsquery('educational')`

#### Using Full Text Search

```SQL
SELECT id 
FROM mytable
WHERE fts @@ to_tsquery('(fun & games) | educational');
```

#### Ranking Results

* `ts_rank` ranks results based on frequency of terms and weights.
  * By default, rank 'A' has weight of 1.0, 'B' 0.4, 'C' 0.2 and 'D' 0.1.
  * Custom weights can be passed as an optional parameter.
* `ts_rank_cd` (coverage density) also considers position of search term within the searched text.
  * Terms found closer together rank higher.

```SQL
SELECT
  id,
  ts_rank(fts, ts)::numeric(10, 3) AS rank 
FROM mytable
WHERE fts @@ to_tsquery('(fun & games) | educational');
ORDER BY rank DESC;
```

### Custom and Composite Data Types

```SQL
CREATE TYPE complex_number AS (r double precision, i double precision);
CREATE TABLE foo (id serial PRIMARY KEY, value complex_number);
SELECT id, (value).* FROM foo;  /* Parentheses around value are required. */
```

* PostgreSQL automatically creates custom types for all tables.
  * These can be used as column types, arrays etc.
* For composite type to be NULL, all elements within must be NULL.
* For composite type to be NOT NULL, all elements within must be NOT NULL.
* Custom types can have custom implementations for supported operators.
  * In SQL, operator is a symbol alias for a function that takes one or two parameters.
  * Functions can be overloaded to accept different types of parameters.
  * Operator also contains information for query optimizer on e.g. how to use indexes and which operator expressions are equivalent. 


```SQL
CREATE OR REPLACE FUNCTION add(complex_number, complex_number)
RETURNS complex_number AS
$$
  SELECT (
    (COALESCE(($1).r, 0) + COALESCE(($2).r, 0)),
    (COALESCE(($1).i, 0) + COALESCE(($2).i, 0))
  )::complex_number;
$$
LANGUAGE sql;

CREATE OPERATOR + (
  PROCEDURE = add,
  LEFTARG = complex_number,
  RIGHTARG = complex_number,
  COMMUTATOR = +
);

SELECT (1, 2)::complex_number + (3, 4)::complex_number;
```

## Chapter 6. Tables, Constraints, and Indexes

### Tables

* `CREATE TABLE foo (id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY);`
  * IDENTITY is similar to `serial` type, but it handles things like dropping and resetting automatically.
  * Always tied to a single table and can't be shared.
* `Inherited tables` inherit all columns from parent and can additionally have their own columns.
  * Structural changes to parent table propagate to child tables.
  * Querying parent table includes rows from the child tables.
  * PK, FK & unique constraints, nor indexes are never inherited.
  * Check constraints are inherited, child tables can haw additional checks.
  * `CREATE TABLE foobar (bar_value int) INHERITS (foo);`
  * Multi-inheritance is supported.
* `Partitioned tables` are similar to inherited tables: they allow partitioning the data and planner can skip tables that don't satisfy query conditions.
  * Data can be INSERTed to core table and it gets automatically routed to correct partition.
  * Partitions must have identical column structure (unlike inherited tables).
  * Partition group has exactly on core table.
  * Core table can't have PKs, unique keys, or indexes.
  * Core table can't have any rows of its own.
  * `CREATE TABLE logs (id int GENERATED BY DEFAULT AS IDENTITY, msg text, ts timestamptz DEFAULT current_timestamp) PARTITION BY RANGE (ts);`
  * `CREATE TABLE logs_2021 PARTITION OF logs FOR VALUES FROM ('2021-01-01') TO ('2022-01-01');`
    * Partitions can't have overlapping ranges.
  * `CREATE TABLE logs_future PARTITION OF logs FOR VALUES FROM ('2022-01-01') TO (unbounded);`
  * Indexes and PKs should be added for partitions for query efficiency.
* `Unlogged tables` will not use rwite-ahead logs and therefore writing operations are much faster.
  * Data might be lost e.g. on power failure.
  * Table can't be replicated to other servers.
  * `CREATE UNLOGGED TABLE ...`
* PostgreSQL automatically creates types for all tables, but the reverse is not true.
  * Tables can be created from types manually: `CREATE TABLE foo OF mytype (CONSTRAINT pk_foo PRIMARY KEY (mytype_column));`
  * To alter the table, edit the type.

### Constraints

* Use `foreign key constraints` and cascade update/delete to avoid orphanated rows.
  * Indexes for FK constraints are not created automatically - one should be added to speed up queries.
* Use `unique constraints` to avoid duplicates.
  * Indexes are created automatically.
* Use `exclusion contraints` to enforce uniqueness that can't be accomplished with equality operator.
  * Handy in e.g. in problems including scheduling when used with range data types.
* Use `check constraints` to force conditions for one or more fields for each row.
  * Functions and boolean expressions can be used to create complicated matching conditions.
  * `ALTER TABLE logs ADD CONSTRAINT mychk CHECK (user_name = lower(user_name));`

### Indexes

* Table can contain multiple index types and the planner will consider which is best for current query.
* Indexes can be created on tables (excluding foreign tables) and materialized views.
* Index names must be unique within the schema.
* `B-Tree` is a general purpose index.
  * Automatically generated indexes and manually created indexes where type isn't defined use B-Tree.
  * Only indexing method for PKs and unique keys.
* Block range index (`BRIN`) is designed for very large tables.
  * Smaller and faster to build than other indexes.
  * Slower to use, don't support PKs etc.
* Generalized Search Tree (`GiST`) is optimized for FTS, spatial, scientific, unstructured, and hierarchial data.
  * Lossy index: index itself won't store the value, so the extra lookup is required to fetch the actual value.
* Generalized Inverted Index (`GIN`) for built-in FTS and bjson.
  * Descendant of GiST but not lossy.
  * Faster to query but slower to update and index is larger than for GiST.
  * Can't index large objects.
* `SP-GiST` can be faster than GiST for certain kinds of data datribution.
* `B-Tree-GiST`/`B-Tree-GIN` are composite indexes.
  * Supports specialized operators GiST/GIN and equality operator of B-Tree.
  * Great for compound indexes of multiple columns containing both simple and complex types.
  * Needs to be installed as extensions.
* Indexes support only specific operators, i.e. queries using other operators can't use the index. When creating an index you can manually specify which `operator class` it should use.
  * Available operator classes vary by index type.
  * Each index can have only one operator class, to support multiple op classes add multiple indexes.
* `Functional index`: index to a function of columns.
  * `CREATE INDEX myindex ON mytable USING btree(upper(myfield) varchar_pattern_ops);`
  * Above index is used when querying `SELECT * FROM mytable WHERE upper(myfield) LIKE 'FOO%';`;
* `Partial indexes` (a.k.a. `filtered indexes`) cover only rows fitting predefined WHERE condition.
  * Index is faster (because more fits into RAM) and smaller on disk.
  * `CREATE UNIQUE INDEX uq ON mytable USING btree(upper(myfied)) WHERE other_field = TRUE;`
  * Index is used only if the WHERE condition used in index is also used in the query.
    * In some cases a view might be a suitable tool to bypass this.
* `Multicolumn index` (a.k.a. `compound index`) work with multiple columns.
  * Planner automatically combines indexes on the fly, so duplicates are not needed. 

## Chapter 7. SQL: The PostgreSQL Way

### Views

```SQL
CREATE OR REPLACE VIEW vw_foo AS
SELECT id, type, value
FROM foo
WHERE value > 9000
WITH CHECK OPTION;
```

* Single table view that contains the primary key can be updated with INSERT/UPDATE/DELETE commands.
  * Views based on multiple tables need to be updated with functions called by INSTEAD OF triggers.
* By default, Using INSERT/UPDATE may result in rows falling out of the view if they no longer match WHERE condition.
  * By using WITH CHECK OPTION, such commands will cause an error. 

#### Materialized Views

```SQL
CREATE MATERIALIZED VIEW vwm_foo AS
SELECT id, type, value
FROM foo
WHERE value > 9000;
```

* *Materialized views* cache the data when they are created.
* Cache can be updated with REFRESH MATERIALIZED VIEW command.
  * By default refreshing blocks querying, using CONCURRENTLY option allows it, but makes refreshing slower. 
* Valuable when reading is slow and outdated data is not an issue.
* *Materialied views* can utilize indexes to speed up read operations. 
* Additionally using ORDER BY when creating the view or CLUSTER command may speed up the read.
  * Each time view is refreshed, it needs to be reclustered.
* CREATE OR REPLACE can't be used with *materialized views*. DROP and recreate instead.

### Handy Constructions

* DISTINCT ON allows defining which columns to consider as distinct and sort the remaining columns.
* Shorthand casting: `'2021-04-17'::date` instead of `CAST('2021-04-17' AS date)`.
  * Multiple casts can be chained.
* Multirow insert: `INSERT INTO foo (bar) VALUES ('first row'), ('second row');`.
* ANY array search: `SELECT * FROM foo WHERE bar ILIKE ANY(ARRAY['%foo%', '%bar%']);`
* DELETE USING is kinda like LEFT JOIN for DELETE: `DELETE FROM foo USING bar WHERE foo.bar_id = bar.id AND bar.type = 'awesome';`
* Returning rows affected by INSERT/UPDATE/DELETE commands: `UPDATE foo SET hits = hits + 1 WHERE hits < 100 RETURNING id, hits;`
  * Handy for e.g. getting the ids of new rows without a separate query.

#### Upserts: INSERT ON CONFLICT UPDATE

So-called "upsert" operations can be used to provide a fallback action if inserting a new row would fail due to existing duplicate row. As a fallback, the existing row can be updated or the action can fail silently.

To be able to use upserts, the table must have a primary key, unique index or unique key constraint that would be violated by the insert.

```SQL
INSERT INTO foo (uuid, val) VALUES (...)
ON CONFLICT uuid
DO UPDATE SET val = EXCLUDED.val;
```

```SQL
INSERT INTO foo (uuid, val) VALUES (...)
ON CONFLICT ON CONSTRAING some_constraint
DO NOTHING;
```

#### Composite Types in Queries

PostgreSQL automatically creates data types of all tables. Since they contain other data types, the are called "composite data types" i.e. "composites". To return the "canonical representation" of a table's composite simply do `SELECT foo FROM foo;`. While this isn't too useful by itself, the result can be used as an input for functions.

```SQL
SELECT json_agg(canonical_array)
FROM (
    SELECT foo FROM foo
) AS canonical_array;
```

#### Dollar Quoting

Since single quotes are used to represent string literals, single quotes within them need to be escaped. By default this is done by using double single quote, but adding them manually is tedious and the result isn't very readable. Alternative way is to use "dollar quoting":

```SQL
INSERT INTO foo (val) VALUES ('Ain''t talkin'' ''bout dub');
INSERT INTO foo (val) VALUES ($$Ain't talkin' 'bout dub$$);
```

### Window Functions

A window function is a function that has access to all the rows included in the query, not just the current one. This can be used to e.g. calculate averages from the whole result set and include the result in each row. According to the documentation "the OVER clause determines exactly how the rows of the query are split up for processing by the window function" - leaving it empty includes all the rows that pass the check in WHERE clause.

```SQL
SELECT "companyName", industry, revenue,
    AVG(revenue) OVER() AS avg_2020
FROM revenue
WHERE year = 2020;
```

PARTITION BY can be used as sort of "group by" for OVER. E.g. to include only rows that share an industry when calculating the average, do something like:

```SQL
SELECT "companyName", industry, revenue,
    AVG(revenue) OVER(PARTITION BY industry) AS avg_industry_2020
FROM revenue;
WHERE year = 2020;
```

OVER also accepts ORDER BY statement, which orders the rows in the requested way, and passes only the values from the rows that have already been processed by the query to the window function. ORDER BY and PARTITION BY can also be combined - the window function then only receives the rows that belong to the current partition.

```SQL
SELECT "companyName", year, revenue,
    SUM(revenue) OVER(PARTITION BY "companyName" ORDER BY year) AS cumulative
FROM revenue
ORDER BY "companyName", year;
```

### LATERAL Joins

Lateral joins allows the righthand table or subquery access information from the lefthand table/subquery. Although you can achieve the same results by using window functions, lateral joins yield faster results with more succinct syntax.

I couldn't come up with a short and simple example where using this would make sense, but just to demonstrate, the following would cause an error without LATERAL, since `foo.status` is not normally accessible within the subquery:

```SQL
SELECT foo.name AS foo_name, bar.name AS bar_name
FROM foo
CROSS JOIN LATERAL (
    SELECT name
    FROM bar
    WHERE foo.status = 'active'
    AND bar.status = 'active'
) AS bar;
```

## Chapter 8. Writing Functions

```SQL
CREATE OR REPLACE FUNCTION func(arg1 arg1_datatype DEFAULT arg1_default) AS
$$
BODY of function
$$
LANGUAGE of function
```

* PostgreSQL supports multiple languages for writing functions, e.g. SQL, ES, Python. More can be installed.
  * `SELECT lanname FROM pg_language` lists supported languages.
  * Language is *trusted* if it has no access to file system or OS commands.
    * E.g. SQL or ES.
    * Functions can be created by any user.
  * Language is *untrusted* if it can interact with OS.
    * E.g. Python.
    * Functions can be created only by superuser, but permission to run can be granted to others.
* Naming arguments is optional but allows using the names in body instead of $1, $2 etc.
* Argument names are not needed when calling the function, but can be to e.g. keep some defaults and override others.
* Additional qualifiers for functions:
  * VOLATILITY: do same arguments result in same returned values?
    * IMMUTABLE: same inputs result in same output
    * STABLE: same inputs result in same output within the same query
    * VOLATILE: all bets are off
    * Planner uses this for caching results
  * STRICT: any NULL argument results in NULL return value
    * Planner skips calling the function with NULL arguments
  * COST: estimated load caused by the function, e.g. 1 for fast or 100 for slow.
    * Planner can execute light functions in WHERE clause first
    * Planner is more likely to cache cumbersome functions
  * ROWS: estimated number of returned rows
  * SECURITY DEFINER: execute function with permissions of the function owner, not the caller
  * PARALLER: can the function be distributed to separate work processes
    * SAFE: allow paraller use, good for IMMUTABLE functions
    * UNSAFE: default value, used e.g. when the results depend on table data, execution order or state
    * RESTRICTED: function can't be performed in a parallel worker, but can be performed in the leader while parallel query is in use

### Triggers and Trigger Functions

* *Statement triggers* run once per SQL statement.
* *Row triggers* run once for each row affected by the SQL.
* Trigger can run BEFORE, AFTER or INSTEAD OF the intended action.
  * BEFORE and AFTER triggers can be attached to tables and events.
  * INSTEAD OF triggers can be attachted to views.
  * In AFTER event, all updates to the NEW record are ignored.
* *Trigger functions* don't accept arguments (they have access to the data, though).
* Each trigger can have one *trigger function*, i.e. to call multiple functions, create multiple triggers.
  * Triggers are executed in alphabetical order.
  * Each trigger has access to the data processed by the previous trigger.

### Aggregates

* Create your own *aggregate functions* in addition to the built-in ones (COUNT, AVG...).
* *Aggregate function* is comprised of one or more functions.
  * *State transition function* performs the computation, usually by running repeatedly in reducer style.
  * Additional functions to manage initial and final states.
* Aggregate can depend on more than one column.

### Writing Functions with SQL

* Fast and easy.
* No support for control structures or variables.
* Query planner understands SQL functions and can thus optimize accordingly.
* To return sets, use RETURNS TABLE, OUT parameters or composite data types.
* Examples used: writing a log row & geometric mean aggregate functions.

```SQL
CREATE OR REPLACE FUNCTION log(username VARCHAR, description TEXT)
RETURNS integer AS
$$
INSERT INTO log (username, description)
VALUES ($1, $2)
RETURNING id;
$$
LANGUAGE 'sql' VOLATILE;

SELECT log('antti', 'Logged in') AS new_id;
```

### Writing PL/pgSQL Functions

* SQL-like syntax, but supports control flow and variables.
* Unlike SQL, can be used as *trigger functions*.
* Example used: updating "last modified" timestamp on insert/update.

### Writing PL/Python Functions

* Separate versions for Python 2 and 3, but both can't be used at the same time.
* *Unstrusted* language.
  * Any OS-level operations are executed as postgres user account.
* Examples used: doing a web search & listing directory contents.

### Writing JavaScript Functions

* V8 JavaScript, CoffeeScript and LiveScript variants.
* *Trusted* languages.
* Supports trigger and aggregate functions.
* Supports *window functions* (unlike e.g. pgSQL and Python).
* Some built-in JSON support.
* Math/number processing heavy functions are a magnitude faster than on SQL functions. 
* Many of the libraries available for Node can be used as-is.
  * Also: copy-paste coding á la Stack Overflow.
* Examples used: validating email address, geometric mean aggregate, a window function.

## Chapter 9. Query Performance Tuning

* EXPLAIN command accepts options:
  * EXPLAIN (ANALYZE) compares expected and actual behaviour.
  * EXPLAIN (VERBOSE).
  * EXPLAIN (ANALYZE, BUFFERS) reports the number of cached results used.
  * All three can be used at once.
* Wrap data changing querys to BEGIN - ROLLBACK to avoid actual changes.
* In the output, each step includes estimated costs, e.g. `cost=0.00..1.23`.
  * The first number is estimated startup cost, i.e. the time before retrieval: scanning indexes, joining tables etc.
  * The seconds number is estimated total cost.
  * The numbers are relative - they should be compared only within the same server.
  * Planner picks the plan with lowest total cost.
* PostgreSQL caches both plans and data.
* `pg_stat_statements` extension provides metrics in running queries, most used queries and their running times. It's included in most PostgreSQL distributions but must be preloaded on startup.

### Writing Better Queries

1. Don't overuse subqueries, rather treat the query as a whole. Joins and grouping can be faster.
2. Avoid `SELECT *`. Only fetching received columns can improve performance in unexpected way, since it allows the database to make optimizations.
3. Use CASE - SQL's if-else statement - instead of inefficien subqueries.
4. Use FILTER instead of CASE in aggregate expressions

#### Parallized queries

* Paraller queries can't be used with e.g. data modifying (e.g. INSERT) or definition (e.g. CREATE TABLE) queries.
* Requires compatible server settings.
* Since setting up parallelization is not free, it's not usually worthwhile for queries in millisecond range.

### Guiding the Query Planner

Planner takes into account indexes, cost settings, strategy settings and the distribution of data.

* Strategy settings
  * By default, all settings are on.
  * They can be disabled per query or permanently - do so if you have prior knowledge of the data.
  * Disabling a setting doesn't mean it's never going to be used - it's more like a suggestion.
  * `enable_nestloop` and `enable_seqscan` are often disabled due to slowness, but they do have their use cases.
    * When you see them being used, check if disabling them would actually speed up the query.
* Indexes
  * Planner goes for full sequential scan if there's no suitable index, or if it deems using the index slower than full scan.
    * I.e. if `enable_seqscan` is disabled and full scan is still used, the indedx is not suitable for the query.
  * Check whether indexes are used by querying `pg_stat_user_indexes` and `pg_stat_user_tables`
* Table statistics
  * Planner can't check each table for actual data each time it runs a query. Instead, it stores statistics about the state of the database in `pg_stats` table.
  * After large data changes, run VACUUM ANALYZE to update this data.
  * For large tables only a small set of rows are used to generate the statistics.
    * Consider increasing the number of sampled rows for columns that are used heavily for JOINs and WHERE clauses: `ALTER TABLE foo ALTER COLUMN bar SET STATISTICS 1000;`.
  * Completely new statistics can be created for columns with correlation:
    * `CREATE STATISTICS stats_foo (dependencies, ndistinct) ON city, zipcode FROM foo;`.
      * Use `ANALYZE foo;` to populate the statistics table.
    * `dependencies` are used to optimize queries with equalities, e.g. `city='Turku' AND zipcode='20100'`.
    * `ndistinct` are used to improve GROUP BY clauses where both `city` and `zipcode` are used together.
* `random_page_cost` setting can be tweaked based on the speed of the physical media.

### Caching

* Using common table expressions and immutable functions encourages caching.
* `shared_buffers` setting defines how much memory is dedicated to caching.
* `pg_prewarm` extension can be used to load commonly used tables into memory.

## Chapter 10. Replication and External Data

* To minimize headaches, master and slaves should:
  1. Use at least the same minor version
  2. Have the same configuration
  3. Have the same set of extensions installed in binary

### Replication Jargon

* *Master* a.k.a. *publisher* is the instance where all updates take place. Currently only one master is supported by the built-in features.
* *Slave* a.k.a. *subscriber* can currently be read-only.
* *Write-ahead log* a.k.a. *transaction log* tracks all transactions. Slaves update their state based on the WAL provided by master.
* *Synchronous replication*: transaction in master is not complete until at least one slave reports it received. 
  * In *asynchronous replication* there's a risk that slave lags too much behind and can't update it's state since WAL has been cleared already.
* *Streaming replication*: Postgre handles sharing the WAL without direct file access between the instances.
* *Cascading replication*: slaves can share WALs between them.
* *Logical replication* allows replication of individual tables.
  * Slaves can also manage their own data that is not part of the master data.
  * Allows replicating between different versions of PostgreSQL.
  * Allows replicating between OSes.
* *Remastering* promotes a slave to master.

### Foreign Data Wrappers

* Extensible, standardized way to query other data sources (other serverS and non-servers).
* Available in the local servers as a *foreign table* that can be queried like regular table.
  * Some FDWs also support updates.
* FDWs for different sources can be found on internet.
* `file_fdw` and `postgres_fdw` are available on most installations.
* Foreign data is usually stored in a separate schema.

Example of creating a foreign table from a file:

```SQL
CREATE EXTENSION file_fdw;
CREATE SERVER file_server FOREIGN DATA WRAPPED file_fdw;

CREATE FOREIGN TABLE foreign.foo (some_col VARCHAR, other_col TEXT)
SERVER file_server
OPTIONS (
  format 'csv',
  header 'true',
  filename '/foo/bar.csv'
  delimiter '|',
  null ''
);

SELECT * FROM foreign.foo LIMIT 3;
DROP FOREIGN TABLE foreign.foo;
```

* `file_textarray_fdw` can read rows with varying number of elements into a text array.
* `postgres_fdw` allows reading and pushing updates to different servers, even with different server versions.
* `www_fdw` allows querying web services.
* IMPORT FOREIGN SCHEMA does just what you'd expect it to.
  * Not supported by all FDWs.
* Other FDWs offer support for other databases, excel etc.

## Appendix A. Installing PostgreSQL

* Various distributions with easy-to-use installers exists. Licencing and included extensions, FDWs etc. vary.
* Some distributions offer standalone setups, which allows testing the version without installing it.
* `apt-postresql` repository for Ubuntu is maintained by PostgreSQL development group.
  * Ubuntu's default repo usually includes the latest stable release.
  * `postgresql-server-dev` package is needed to compile add-ons not available in the repo.

## Appendix B. PostgreSQL Packaged Command-Line Tools

### Database Backup Using pg_dump

* Supports TAR, custom compressed format, plain text and plain text SQL
* Import with e.g. `psql`

### Server Backup: pg_dumpall

* Backs up all databases on the server, including server-level objects such as roles
* Ooutputs a single plaing-text or plain-text SQL file.

### Database Restore: pg_restore

### psql Interactive Commands

* Interactive shell for the database server.
* `\watch [seconds]` executes the previous query on given interval.
* `\di` lists indexes.
* `\dm` lists materialized views.
* `\dt` lists tables.
* `\dm` lists materialized views.
* `\dx` lists installed extensions.
* `\l` lists databases.
* `\a` toggles between aligned output mode.
* `\H` toggles HTML output mode.
* `\t` shows only rows.
* `\x` toggle expanded output (combines nicely with `\t`).


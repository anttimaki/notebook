# Software Engineering at Google

* **Book**: [Software Engineering at Google](https://abseil.io/resources/swe-book/html/toc.html)
* **Author**: Titus Winters et al.
* **Date read**: 28-06-2023

## Thesis

### What Is Software Engineering?

Programming is the immediate act of producing code. Software engineering is a set of policies, practices and tools for making code useful for as long as it needs to be and allowing collaboration across a team.

In their work, software engineers should keep in mind:

1. *Time and Change*: code needs to adapt over its life cycle
2. *Scale and Growth*: organization needs to adapt as it evolves
3. *Trade-offs and Costs*: making decisions based on the other two

#### Time and Change

* _"Software engineering is programming integrated over time."_
    * As the expected life span of the code grows, so do things to consider, e.g. relying on libraries, language, OS, and hardware
    * Life span of code can vary from minutes to decades, i.e. a factor of 100k
* *Sustainable* code is capable of reacting for changes based on technical or business reasons for its expected life span
* Early-stage startup might rightly choose to focus on immediate goals as the company might not live long enough to benefit from long-term investments
* Long term projects should plan from the start for staying current, since large, overdue upgrades can be painful
  * If changing something comes at inordinate cost, it will likely be deferred - but making change cheap might not be worth it for short lived projects
* _"It's programming if 'clever' is a compliment, but it's software engineering if 'clever' is an accusation."_

#### Scale and Growth

* _"Software engineering is the multiperson development of multiversion program"_
    * I.e. in addition to "integrated over time", SWE is also integrated over people: it needs to take into account team organization, project composition, policies, and practices as the team scales
    * Size of an organization can vary by a factor of 10k
* If costs grow superlinearly over time, the operation clearly is not scalable
* Everything an organization relies upon to produce and maintain code should be scalable in terms of overall cost and resource consumption. In particular, everything an organization must do repeatedly should be scalable in terms of human effort.
  * Consider scalability of a process as the codebase or the organization grows
  * Policies can be used to keep processes scalable.
  * Be proactive to avoid the boiled-frog problem
* Having experts familiar with the problem handle it for everyone is more efficient than forcing everyone to deal with it themselves
* *Shifting left* (on a workflow timeline): detecting problems earlier reduces the cost of solving them

#### Trade-offs and Costs

* SWE is different from programming in terms of the complexity of required decisions and the stakes involved on the decisions
* Costs to consider when making a decisions:
  * Financial (e.g. money)
  * Resources (e.g. CPU)
  * Personnel (e.g. engineering effort)
  * Transaction (what does it cost to take action?)
  * Opportunity (what does it cost to NOT take action?)
  * Societal (impact on society at large)
* Optimize the whole (e.g. saving few dollars on office supplies causing wasted engineering resources)
* Aim for data-driven decisions even though all the data is rarely available

### How to Work Well on Teams

* Insecurity can lead to hiding code before it's polished but it also...
  * hampers detection of fundamental design mistakes
  * risks reinventing wheels
  * forfeits benefits of collaboration (learning, velocity, perspectives...)
  * creates a bus factor of one
* Core principles of social interaction
  * Humility: you nor your code is center of the universe; you're neither omniscient nor infallible
  * Respect: genuinely care about others
  * Trust: others are competent and will do the right thing
* Relationships outlast projects

### Knowledge Sharing

* Challenges to learning
  * Lack of psychological safety
  * Information islands
    * Information fragmentation: each island has an incomplete picture of the whole
    * Information duplication: each island has reinvented its own way of doing something
    * Information skew: each island has its own ways of doing a thing, which might or might not conflict
  * Single Point of Failure: bus factor of one
    * "It's faster for me to do it" => poor long term scalability
  * All-or-nothing expertise
    * Experts not mentoring or documenting accumulates knowledge and responsibilities to those who already are experts
  * Parroting: mimicry without understanding
  * *Haunted graveyards*: e.g. pieces of code the organization avoids touching because something might go wrong
* Documentation scales vs. one-to-one advice can adapt to the specific situation and learner's knowledge level
* Company should value knowledge sharing; doing valued things should be encouraged and rewarded

### Engineering for Equity

* Subconscious bias is the default: conscious effort is required to bring diverse perspectives into product design
* Diverse teams: candidate pool, hires, retention, career progression
* Datasets used in AI training
* Designing for the user who is least like you

### How to Lead a Team

* At Google
  * *Manager* leads people, but should have engineering background
    * Responsible for performance, productivity and happiness of the team, as well as meeting the needs of the business 
  * *Tech Lead* leads technology efforts
    * Responsible for technology choices, architecture, priorities, velocity, and project management
    * Usually also contribute hands on, must decide what to do and what to delegate
  * On small teams *Tech Lead Manager* can fill both roles
    * Usually separate persons since it's difficult to do both jobs well without burning out
* *Peter Principle*: "In a hierarchy every employee tends to rise to his level of incompetence"
  * Avoided by requiring to perform the job above their current level for a while before promotion
* Traditional managers worry about how to get things done, whereas great managers worry about what things get done (and trust their team to figure out how to do it).
* Engineering management antipatterns (don't do this)
  * Hiring pushovers: feeling insecure might lead to hiring people who won't challenge your leadership, but they don't usually perform well without constant management or exceed expectations
  * Ignoring low performers (LP)
    * Low performers aren't capable of doing their job no matter how long or hard they work
      * LPs might perform better and be more satisfied at different jobs
    * Ignoring LP is bad because they don't usually improve or leave voluntarily
      * High performers waste time carrying LP, eroding morale. When they leave the team consist only of LPs
    * Deal ASAP with "up or out" approach
      * Set explicit, clearly communicated time limits and goals
      * Goals should be specific, small but incremental, measurable as fail or success
      * Track progress weekly
  * Ignoring human issues
  * Being everyone's friend (especially when promoted from within the team)
  * Compromising the hiring bar (for growth)
  * Treating the team like children
    * Micromanagement, looking down on their abilities, giving no opportunity to take responsibility
* Positive patterns (do this)
  * Lose the ego: trust the team, you can't know everything and have all the right answers
  * Be a zen master: remain calm and confident, don't be vocally skeptical
    * When asked for help, act as a rubber duck and ask questions instead of solving the issue yourself
  * Be a catalyst: help others work as a team
    * Build consensus, but make the decision to proceed when necessary
  * Remove blockers
  * Be a mentor
  * Set clear goals: what are the priorities, how and when to make trade-offs
  * Be honest
    * Compliment sandwich causes people to not hear the criticism
  * Track happiness
* Unless you want to keep doing the exact same job for the rest of your career, seek to replace yourself.
  * Hire people smarter than you
  * Give them opportunities to take on more responsibilities
* Shield your team from chaos (e.g. uncertainty and organization politics) and frivolous demands from outside
* Use low barrier to say "yes" to things that are easy to undo
* Team members have individual needs, so no one-size-fits-all management
* To improve people's happiness and productivity, improve their intrinsic motivation
    * Autonomy: brings closer relationship and ownership with the product
    * Mastery: learning motivates employees and improves/maintains their skills
    * Purpose: what effect the work has on the company, the customores, or the world
      * Share received feedback
* Pay particular attention to the focus, direction, and velocity of  your team

### Leading at Scale

* When moving to lead multiple teams, the servant leader practices still apply
  * Can't focus on details anymore (broad rather than deep)
  * Can have a bigger impact as leader than code contributor
  * Decisions tend to be about strategy and trade-offs
* Always be deciding: a process for ambiguous problems
  1. Identify the blinders: people blinded the current situation make unnecessary assumptions about the problem/solution
  2. Identify the trade-offs: explain them to everyone and help decide how to balance them
  3. Decide, then iterate: avoid analysis paralysis by making a decision and iterating as necessary
* Always be leaving: empower teams to solve their issues to avoid becoming a single point of failure
  * Delegation is the most effective way to train self-sufficient employees
  * Use the freed time to focus on strategy
    * Observe co-workers and customers and make small adjustments in the right places
  * Make teams responsible for a problem instead of a solution (e.g. product) to avoid blinders
* Always be scaling: protect your time, attention and energy
  * In corporation, success is often rewarded with more responsibilities, but not necessarily with more resources to handle them
  * Important vs. urgent
    * Important work that can't be delegated (e.g. strategy planning) is rarely urgent
    * Delegate urgent things, since they're often not that important
    * Schedule dedicated time for proactive things to avoid working 100% reactively
    * (Find a system to) track and prioritize work
  * Learn to drop balls (deliberately rather than due to circumstances)
    * Konmari your tasks: instead of identifying and dropping the bottom 20%, identify and focus on the top 20%
      * Ideally self-sufficient subleaders notice and pick the middle 60% without having to delegate them
      * Even if the middle 60% won't get done at all, they'll eventually rise to the top 20% if they're important
  * Learn when you need to recharge: take vacations, weekends off, mental health days, breaks during the day, disconnect

### Measuring Engineering Productivity

* TL;DR: have a team of specialists whose sole job is to help other teams measure productivity
* Adding more engineers don't scale productivity linearly due to communication overhead
  * Improve productivity of each individual instead
  * Time taken to improve productivity can't exceed the benefits of the increased productivity
* Triage: is it worth measuring?
  * What results are you expecting and why?
  * What actions will be taken if the data does or doesn't support the expectation?
  * No point measuring if
    * Don't have the power and resources (including time) to take the planned actions
    * Results are vanity metrics and the actions have already been decided
    * Can't measure with sufficient precision or interpret the results
* Goals/Signals/Metrics (GSM) framework for metrics creation
  * Goals: what you want to understand (but NOT how to measure it)
    * Remember to consider trade-offs: e.g. for code reviews quality, velocity, context switching, satisfaction
  * Signals: how to know the desired result is achieved
    * Maybe what you'd want to measure, but not necessarily measurable by itself (e.g. code quality)
    * Goals and signals can have many-to-many relations
  * Metrics: proxy for the signal (might not be ideal, but is measurable)
    * Signal can have multiple metrics
  * Moving G->S->M prevents choosing metrics just because they're easily accessible, or metrics likely to produce the expected result, instead of what is needed to achieve the goal
  * Makes unmeasurable things visible, helping to decide whether to attempt measurement at all
  * Traceability: each metric points to a signal which points to a goal, so you know why each metric is measured

## Processes

### Style Guides and Rules

* *Rules* are strict, mandatory, universally enforceable laws
  * Exceptions need to be approved on case-by-case basis
    * Good way to catch bugs and misunderstandings
  * Google's principles for developing rules: each rule must
    1. Pull its weight
      * Adding rules has costs (learning, remembering, maintaining)
      * Good tooling might alleviate costs dramatically
      * Skip self-evident rules (just because it isn't forbidden doesn't mean it's allowed)
    2. Optimise for the reader
    3. Be consistent
      * Allows focusing on what's being done rather than how it's presented
      * Favour the same tools, techniques, libraries, patterns, formatting etc.
      * Favour local consistency
        * It might not make sense to refactor a file to match the rest of the repo, or a repo to match other projects
        * But when starting anew, take both external and internal conventions into consideration
      * *Chunking*: a cognitive process that groups pieces of information together into meaningful "chunks" rather than keeping note of them individually
      * Supports scaling (tools, maintenance, developer mobility across projects)
    4. Avoid error-prone and surprising constructs
      * Even if you understand the pitfalls, the next dev might not, causing subtle bugs to creep in
    5. Concede to practicalities when necessary
      * E.g. critical performance issues are more important than readability
  * Rules can be enforced socially (teaching, training) or technically (tooling)
    * Code reviews are hugely important for enforcement at Google
    * Tooling persist when personnel come and go and protects against biassed interpretation
      * Some rules explicitly call for human judgement
* *Guidance*: a recommendation or an advice (a "should") rather than a rule (a "must")
  * Best practices of collected wisdom based on experience
  * Primers that aim to serve as the go-to reference for the issue
* Google's style guides contain *rules*
  * What is "good" or "bad" varies based on what company values most
    * Google prioritises codebase sustainability (time and scale)
    * Performance optimization or consistency are valid options too
  * When choosing rules, instead of "what rules should we have?", ask "what goal are we trying to advance?" and "why does something go into the style guide?"
  * Style guide shapes common "vocabulary of coding", which tends to lead subconsciously choosing the "good" practice by default
  * Categories for rules:
    1. Rules to avoid danger: musts and must nots based on technical reasons
    2. Rules to enforce best practices: for healthy, readable and maintainable codebase
    3. Rules to ensure consistency: for low-impact stuff just make a decision and document it to prevent endless debates
    4. For everything else: you might not need it (skip the self-evident stuff)
  * Style guides need to adapt to changes over time
    * External changes, e.g. a new language version
    * Internal changes, e.g. engineers spending effort to circumvent a rule
    * Style guide should contain the pros and cons that were considered when the rule was decided, so it's easier to re-evaluate them later
  * Include limitations on new and not-yet-well-understood language features
    * Limiting use gives a chance to watch the usage patterns that develop and extract best practices
    * As adoption spreads, engineers wanting to use the new features discuss their examples with the style guide owners
    * Eventually when there's enough examples to generalise good practice from bad, circle back to the restrictive ruling and amend it to allow wider use
* "<language>@google 101", full day courses on how the language is used at Google, including frequently used libraries, idioms, custom tools and in-house preferences

### Code Review

* CR is one of the most important and critical processes at Google
  * While acknowledging that strict processes may slow velocity and time-to-production, and bureaucratic rules tend not to work well with creative professionals, Google maintains CR as a blanket process that applies to all engineers and code changes
    * Minor changes to documentation or configuration may be excempted
* Google uses otherwise mostly typical review process, but they use a custom CR tool called Critique, where patches are mailed to reviewers
  * Three approvals are required, each focusing on different aspect:
    1. Another engineer (often a team member) checks for correctness and comprehension before "LGTM":ing the changes
    2. Every part of codebase has a gatekeeping owner (e.g. tech lead), who must approve merging the changes
      * Focuses e.g. on maintainability and tech debt
    3. Person with authority in "readability" matters approves the changes based on style and best practice matters
    * All three roles may be fulfilled by the same reviewer
    * Latter two can be implicitly self-reviewed if the author has authority in the related matters

#### Benefits

1. Checks code correctness
  * Detecting problems early ("shift left") saves time, as long as the CR itself kept lightweight
  * Reviewer proposes alternatives that improve comprehension (e.g. less complexity) or functionality (e.g. efficiency), but not because of personal opinions
  * Reviewers are encouraged to approve changes that improve the codebase rather than wait for consensus on a "perfect" solution
2. Ensures changes are comprehensible to other engineers
  * More important than correctness when scaling over time and/or lines of code
  * First test to see if the change is understandable to others, important due to "write once, read many times"
  * Any question raised in the CR tends to be raised many times later if no changes are made
    * Comments explaining the code may be a valid option
3. Enforces consistency
  * Critical to Google due to scale of people and time
  * Check the code follows best practices (for that language), is consistent with the codebase, isn't overly complex
  * Consistency improves comprehension
4. Promotes psychological team ownership
  * The code is not yours but a part of collective enterprise: compromise personal style for the greater good
  * Standardised CR process makes it easier to accept others "judging" the code
    * Reviewer is doing their job by being critical, since that's what the process requires
    * Reviewer is critical about the code, not about you or your skills
  * CR acts as validation and recognition of one's work, battling impostor syndrome
  * Prevents the author from cutting corners - as long as the reviewer actually holds the author accountable
5. Enables knowledge sharing
6. Provides historical record of the CR itself
  * It's not just the author and the reviewer who will interact with the code in the future

#### Best Practices

* Be polite and professional
  * Author shouldn't resist valid feedback just because they like their approach more, or because changes would require additional effort
  * The reviewer shouldn't force their opinions if the author's implementation isn't deficient 
  * Review promptly (initial feedback within 24 working hours at Google) or notify author about delays ASAP
  * Avoid piecemeal reviews
  * Treat each review comment as a TODO item: they should be addressed somehow even if they cause no changes
* Write small changes
  * Changes should generally be limited to about 200 lines of code
  * Reviewer is allowed to reject large changes based on the size alone, but should also accommodate occasional large changes when they make sense
  * Reviewer should avoid expanding the scope to address related concerns if that makes the change too big
  * Helps reviewers to give the review within the time limit, which can also shorten the developers downtime
  * Small change leads to small LGTM reviews, which are easily reviewed by gatekeeper and readability reviewers, if they're separate persons, allowing them to focus on their own parts
* Keep reviewers to a minimum
  * Most CRs at Google has exactly one LGTM reviewer due to diminishing returns
* Write good change descriptions
  * Title as a summary, description for what was changed and why
* Automate where possible
  * Google's tool does static analysis as a *presubmit* and prevents sending the review request until obvious issues are fixed

#### Types of Code Reviews

1. Greenfield projects and new features
  * Do extensive review (design and code) at the beginning to avoid starting the project at the wrong foot
    * Future code reviews are not the place to debate design decisions already made in the past
  * Ensure APIs match the designs, since changing them later is cumbersome
    * Unit test all endpoints
2. Behavioral changes, improvements, and optimizations
  * Is the change necessary, and does it improve the codebase?
  * Ensure test cases are updated to match changing behaviour (just because they don't break doesn't mean they don't need changes)
  * Also test performance
3. Bug fixes and rollbacks
  * Bug fix should only contain the fix and updates to test cases, and no other changes
4. Refactorings and large-scale changes
  * LSC are usually machine generated, but still require review
    * Review comments should be about the effects on the codebase, and not about the tool that generated the changes, since the tool has had it's own review process

### Documenatation

* Writing documentation doesn't benefit the writer immediately, but the organization in the future (i.e. documentation scales)
* Write once, read many times - optimize for the reader
  * Don't assume the audience has same skill level, domain knowledge, or goals as you do
    * *Seekers* know what they want, provide consistency to help find it
    * *Stumblers* might not know exactly what they want, provide clarity (e.g. overviews and TL;DRs)
    * *Customers* (public interface) vs. *Providers* (implementation details)
  * Keep it short: first write everything down, then remove what isn't needed
* Benefits of writing documentation
  * Helps formulate e.g. APIs (if you can't explain or define it, it's probably not designed well enough)
  * Provides roadmap for maintenance and a historical record
  * Well documented products are seen as higher quality products, driving traffic
  * Saves time when the same questions don't need to be answered separately
* Documentation is like code
  * Developers use different tools and languages to solve different problems, documentation is just another tool/language
    * Like other languages, documents should follow standardized style guides and common best practices
  * Documents too should have owners responsible for maintaining them
  * Documents too should use source control and issue tracking
  * Documents too should be reviewed when changed
    * Technical review by subject expert, for accuracy
    * Audience review by someone unfamiliar with the domain, for clarity
    * Writing review by technical writer or volunteer, for consistency
* Identify the document's purpose and stick to it - don't mix different documentation types
  * Reference documentation
    * Code comments: remember *customers* vs. *providers*
      * Tooling like PyDoc for generating documents
  * Design documents
    * Most teams at Google require an approved design document before starting work on any major project
      * Cover the goals of the design, implementation strategy, propose design decisions based on their trade-offs
      * Consider security implications, i18n, storage requirements, privacy concerns, etc.
    * Works as a historical record, a reference before launching, and a measure stick for project's success
  * Tutorials
    * Best time to write and review tutorial is when you join an existing team
    * Emphasize on not requiring prior domain knowledge, include all the required steps and number them
  * Conceptual documentation
    * For deeper insights that don't fit reference documentation, but augment it, e.g. a library overview
    * Most difficult to write and thus often neglected
    * Can duplicate information from RD if it provides clarity
    * Doesn't need to cover all the edge cases (but RD should), trading accuracy for clarity
  * Landing pages
    * Indexes for other documents, making them easy to find
    * Separate "team page" from "users page"
* Good documentation
  * Remembers the audience: "This document if for new employees"
  * Remembers its purpose: "This document is a tutorial to..."
  * Can be accessed (discovery, ease of collaboration, source control)
  * Has a beginning (denote the problem), a middle (recommend solutions), and an end (summarize the takeaway)

### Testing Overview

* In addition to catching bugs, testing:
  * Supports the software's ability to change, which helps adapting quickly to market conditions and customer tastes
  * Reveals tight coupling, missing API use cases, and unhandled edge cases
  * Reduces time spent debugging issues and reviewing PRs
  * Detects issues brought up by updates to dependencies
  * Documents the code in a way that's less likely to get outdated, and helps detecting when written documentation does
* Classifying tests by size: resources (time, memory, processes) required to run the test case
  * Test case should be as small as possible to test the given functionality
  * Regardless of the size, test cases should strive to be *hermetic*: contain all of the information necessary to set up, execute, and tear down its environment, while assuming as little as possible about the outside environment, such as the order in which the tests are run 
  * Small: both test case and the code being tested run in a single process (or preferrably a thread)
    * Can't sleep, make I/O operations or any other blocking calls
    * Fast and deterministic
  * Medium: runs in a single machine
    * Network calls allowed only to localhost
    * Slower, the OS and 3rd party processes increases likelihood of being nondeterministic
  * Large: runs in multiple machines
    * External network calls increases slowness and nondeterminism
    * End-to-end testing for validating configuration
* Classifying tests by scope: code paths that are verified by the test case
  * Scope refers to the code that's being validated, not the code that's being executed
  * Narrow scope (unit tests)
    * Small, focused part of codebase, like a method or class
  * Medium scope (integration tests)
    * Interactions between small number of components, like a server and database
  * Large scope (end-to-end tests)
    * Interactions between several distinct parts
  * Google aims for a mix of 80% narrow, 15% medium, and 5% large scope tests
    * Suite with mostly large scope tests tend to be slow, unreliable, and difficult to work with
    * Suite with mostly small and large tests - a symptom of tight coupling - is little better, but could still be optimized 
* Strongly discourage control flow statements in the tests, as it increases the likelihood of bugs in the tests and makes them harder to review
* Write once, read many times
* Test everything you don't want to break, including performance, security, and error handling
* Code coverage only measures invoked lines, not the results. Instead of fixating on the coverage, aim for quality

### Unit testing

* Unit tests improve engineer's productivity
  * As fast-running tests, they can run frequently and give immediate feedback
  * As easy to write while working on code, they allow testing without knowledge of the larger system
  * As simple and focused, they make it easy to understand what's wrong
  * Can serve as documentation about how a piece of code is intended to work
* Unchanging tests: ideally the test case doesn't need to change unless the requirements of the system changes
  * *Refactoring* should require no changes to tests - if it does, either the functionality is changing unintentionally, or the test cases aren't written at an appropriate level of abstraction
  * *Adding features* should require only adding new tests for the feature, without changing existing tests
  * *Bug fixes* should require only adding new tests to cover the missing test case, without changing existing tests
  * *Behaviour changes* likely requires changes to tests since "explicit contract of the system" is intentionally broken
* *Maintainable tests*: ones you don't need to think about until they fail, and they fail only when a new bug is introduced
  * *Brittle test*: fails due to code change that introduces no real bugs
    * Making assumptions about the structure of the code
  * *Flaky test*: fails nondeterministically without any changes to code
  * **Test public APIs, not their implementation details**
    * On code, make methods and properties private when appropriate
    * Just because something is accessible due to technical reasons doesn't mean it's a part of public API
  * **Test state** (what system looks like after invoking it), **not interactions** (did the system take expected sequence of actions)
    * Prefer real objects over mocked ones as long as they're fast and deterministic
  * **Test behaviour** (given X, when Y, then Z), **not methods**
    * Having a test for each method leads to problems as the methods grow more complex - instead have multiple tests for a method, each testing a single behaviour
* Clear test is one whose purpose for existing and reason for failing is immediate clear
  * Unclear test may just get deleted when it fails and no-one knows how to fix them, leaving holes in test coverage
  * *Complete* test contains all the information a reader needs to understand how it arrives at its result, *concise* test contains no other distracting information
  * Don't put logic in tests
  * Write clear failure messages: Expected X, got Y: details
  * Test code should use *Descriptive And Meaningful Phrases* (DAMP)
    * It can be worth violating DRY principle if it leads to clearer tests
    * It can be worth DRYing repetitive steps irrelevant to behaviour being tested
  * Avoid sharing constants, since they tend to either get generic names making the intent unclear, or be reused in scenarios where specific name doesn't describe what's being tested
    * Construct data using helper methods that require only specifying the relevant values and settings reasonable defaults to others
      * Randomising the defaults can detect issues hardcoded dependencies on default parameters
  * Be careful when sharing setup
    * Setup/Teardown methods executed before/after each test can make the tests clearer
    * They can also harm clearness by hiding important details, and make test depend on values used in setup

### Test Doubles

* Terminology
  * *Test double* is an object or function that can stand in for a real implementation
    * Can be used to make big test cases smaller, but has trade-offs:
      * *Testability*: the code needs to be designed with test doubles in mind
      * *Applicability*: improper use may result in brittle, complex, or less effective tests
      * *Fidelity*: how closely the behaviour or test double resembles the behaviour of the real implementation
    * Three primary techniques for using test doubles
      * A *fake* is a lightweight implementation of an API that behaves similar to the real implementation
        * Changes in real implementation usually requires updating the fake too
      * *Stubbing* means specifying exactly what values a function should return when tested
      * *Interaction testing* is a way to validate how a function is called without actually calling it
        * I.e. correct number of calls with correct arguments
  * A *seam* is a way to make code testable by allowing for the use of test doubles
    * *Dependency injection*: rather than instantiating used classes directly, the tested code receive them e.g. as parameters
      * Less important in dynamically typed languages that allow dynamically replacing functions and methods
  * A *mock* is a test double whose behaviour is specified inline in a test
  * *Classical testing* prefers using real implementations, whereas *mockist testing* rely on mocking frameworks
* At Google, the usage has fluctuated. Introduction of easy-to-use mocking frameworks lead to overuse, causing the test suite to become hard to maintain while rarely finding bugs, which lead to more realistic tests becoming more popular. Now practices vary by team.
* Prefer realism over isolation
  * Test doubles isolate the system under test from it's dependencies, requiring running slow integration tests to have confidence things actually work properly
  * Tests relaying on test doubles tend to make assumptions about the implementation, while good tests test an interface and don't care about implementation
  * Using test doubles can hide bugs in real implementations
  * Real implementation should be used whenever it's feasible while keeping the test case fast
    * Consider using real implementation until it becomes too slow, then update tests to use test doubles
  * Test doubles should be used to keep tests deterministic and hermetic, e.g. by removing requests to external server
* Fakes
  * Prefer fakes over stubs and interaction testing
    * Fakes behave similarly to the real implementation, so the test isn't even able to discern fake from the real deal
  * Fakes require effort and domain experience when written, as well as constant maintenance, and should therefore be written by the team that owns the real implementation
    * Effort/benefit trade-off analysis
  * Fakes are useful only when they have high-enough fidelity, but the fidelity is considered only from the perspective of the test
  * A fake must have its own tests to ensure that it conforms to the API even when the real implementation evolves
    * *Contract tests*: tests written against the API and run against both the real implemenatation and the fake
* Stubbing
  * Stubbing makes tests brittle by leaking implementation details into the tests
  * Stubbing may hide problems in the real implementation
  * Adding stubbing code to test adds noise, making the intent of the test less clear
  * Stubbing excels at returning values or errors that are hard to trigger in real implementation or fake
* Interaction testing
  * Interaction testing tests that the system **tried** to do something, not that is succeeded
    * Heavily depends on assumptions about the internal implementation, failing on valid changes to the system
    * Prefer *state testing*, i.e. checking that the tested system returned correct value or is in correct state after the call
  * Can be better than nothing when a fake doesn't exist and calling the real implementation isn't an option
  * Excels when differences in the number or order of calls would cause undesired behaviour, e.g. cache solution calling the database when it shouldn't
  * Should always be paired with other tests, e.g. integration tests

### Larger Testing

* By Google's definition, larger tests may be slow, nonhermetic, and thus nondeterministic
  * Good tests are fast, reliable, and scalable
* *Environment fidelity*: unit test < 1-process System Under Test (SUT) < isolated SUT < staging < production
* *Test content faithfulness*
  * Hand-crafted unit tests cover narrow range of cases and conforms to the biases of the author
  * Copy of production data would be most faithful, but isn't available until the SUT is launched
* Common gaps in unit tests
  * Unfaithful doubles (incorrect assumptions about the code being mocked, mocks becoming stale over time)
  * Configuration issues
  * Issues that arise under load
  * Unanticipated (by the writer of the test cases) behaviours, inputs, and side effects
  * Emergent behaviours and the "vacuum effect" (changes outside the scope of unit test)
* Why not have larger tests
  * Slow, unreliable, unscalable
  * No clear ownership
  * Lack of standardisation
* While larger tests are necessary to test large scale software, they scale badly on the complexity of authoring, running, maintaining, and debugging
* Structure of a Large Test
  1. Obtain a SUT
    * Scope of SUT (from single-process to shared environments) affects the size of the test
    * Hermeticity: how isolated or exposed the SUT is to sources of concurrency and infrastructure flakiness
    * Fidelity: how accurately the SUT reflects the production environment (configurations, infrastructure etc.)
    * Hermeticity and fidelity are often in direct conflict
  2. Seed necessary test data
    * Data can be handcrafted or copied/sampled from e.g. production
  3. Perform actions using the SUT
  4. Verify behaviours
    * Manual verification is possible but doesn't scale
    * Assertions
    * A/B comparisons (may require manual verification to see if differences are acceptable)
* Part of software design is to create a test plan
  * Identifies risks and the test approaches to mitigate them
  * Outlines what types of testing is needed and what ratios to use
    * Combine different sizes of SUTs, test data and verification behaviours to get different test types
* Google encourages running large tests pre-submit, and automates it post-submit
* Failing large test can be confusing to a developer not familiar with all the parts in play
  * Error message should clearly identify the failure
  * Minimize effort required to identify the root cause
    * Stack trace limited to local environment might not be useful
  * Provide support and contact information

### Deprecation

> There are two ways of doing things: the one that’s deprecated, and the one that’s not-yet-ready. — Old Google joke

* New technologies, libraries, techniques, languages, and other environmental changes over time render existing systems obsolete
* Old systems require maintenance, esoteric expertise, and generally more work as they diverge from the surrounding ecosystem
* *Deprecation*: process of orderly migration away from and eventual removal of obsolete systems
  * *Advisory deprecation*: no deadline, not high priority for maintainer
    * Advertisement of the new system rather than enforced migration
    * Works when the benefits to users are more than marginal
  * *Compulsory deprecation*: deadline for removal
    * Provide support for migrating, break noncompliant users after sufficient warning
* Google is still learning how best to deprecate and remove software systems
  * They have observed that migrating to entirely new systems is extremely expensive, and the costs are frequently underestimated
  * Incremental deprecation (in-place refactoring) can keep existing systems running while delivering value to users
* Premise: *"code is a liability, not an asset"* (maintenance, hosting...)
  * Functionality that meets a user need is an asset
  * Code that provides the functionality is a liability - prefer single line of maintainable, understandable code over 10k lines
* *Hyrum's Law*: With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody
  * Deprecation usually requires availability of a newer system with same or better functionality
  * One-to-one match between the old and new system is rare
* Deprecation is rarely designed beforehand, because engineers like to build instead of maintain, corporations want to launch products quickly, and accepting eventual deprecation of the cool new thing is psychologically difficult
  * Design should take into account the ease of migration to the replacement and how can parts of the system be replaced incrementally
* Deprecation process
  * Should have an owner, otherwise the deprecation likely ends up being an advisory one
  * Should have concrete, incremental milestones to track progress
  * Should have tooling for
    * Discovery: who are using the system, and in which unanticipated ways?
    * Migration: Google has automated tooling to update the codebase to refer new libraries etc
    * Preventing backsliding
      * Prevent or discourage new users
      * Notifications on package managers, compilers, CI pipeline

## Tools

### Version Control and Branch Management

* Centralized version control systems (CVCS) are inherently less complex than distributed ones
* In CVCS, the current trunk acts as a single source of truth (SSoT), requiring less policies and norms
  * Without SSoT, creating a release build would require human effort to ensure everyone's changes are included
  * Without SSoT, where does a new developer get "the current version"?
* Branch management
  * In CVCS, all uncommitted local changes are conceptually equal to dev branches
  * Research indicates that trunk-based development is a predictive factor in high-performing development organizations
  * Problems caused by committing directly to the trunk can be mitigated with automated tests, CI, and quality enforcement practices
  * "Sync the trunk and commit" policy tends to keep the changes small
  * Continuous deployment makes release branches unnecessary
* At Google
  * 50k engineers working on 86TB monorepo with ~70k daily commits
    * In practice, each engineer works on small subset of files and versions
    * Some large OSS projects have separate repos (Android, Chromium)
  * Custom CVCS "Piper", a distributed microservice with cloud storage that "scales massively"
    * Acquiring a fresh version of the trunk, creating a file and committing it takes around 15 seconds
    * Stuff committed to trunk can be disabled from runtime and hidden from other developers until it's ready
    * Each subtree in the file hierarchy has owners who are allowed to approve commits
  * *One Version Rule*: "Developers must never have a choice of 'What version of this component should I depend upon?'"
    * I.e. only one version of a dependency can be referred within the repo
      * Some leeway for dependencies of external dependencies
    * Violations of the rule lead to merge strategy discussions, diamond dependencies, lost work, and wasted effort
* "Aim for the functionality of a monorepo, but allow yourself the flexibility of implementing that experience in a different fashion"

### Code Search

* Google created web UI based *Code Search* tool since common IDE tools don't work with Google's distributed, cloud storage based repo
  * Code browsing like jump to definition, show usages, how to import
  * Easily linkable resources, e.g. for code reviews
  * Version control and ticket system integrations
  * Fleet-wide resource usage stats
  * APIs which can be used by other internal tools, such as IDE plugins
* Benefits of standalone code search
  * Ditching IDE allows focusing on code search UX (e.g. mouse navigation)
  * Indexing can be done once at background, instead of separately on everyone's PC
  * Can be optimized to keep things fast, which saves time at scale, and responsive UI retains engineer's flow state

### Build Systems and Build Philosophy

* A compiler doesn't work on distributed repo containing multiple languages
* Augmenting compilers with shell scripts has many caveats and doesn't scale
* Modern build systems
  * A build systems transforms source code to machine-readable executable binaries
    * A good system is fast and "correct" (=deterministic), whereas older systems have been doing trade-offs between the two
  * Manages dependencies
    * Task dependency: "Push the documentation before marking a release complete"
    * Artifact dependency: "I need the latest version of a library to build my code"
    * Internal and external dependencies to other code
  * Primitive task-based systems (Ant, Grunt, Rake)
    * Engineers create imperative *buildfiles* describing *how* to create the output
    * Minor improvements over shell scripts, but since tasks can do just about anything, it's still difficult to create a system that guarantees it does what you expect it to
    * Problems with parallelizing build steps, performing incremental builds, and maintaining/debugging scripts
  * Artifact-based systems (Google's Blaze)
    * Buildfiles are declarative: what artifacts can be built, with what dependencies, and limited options to affect the build
      * Reduces flexibility but improves productivity and user satisfaction
    * Use e.g. CLI to tell what to build, the system decides the how (configure, schedule, run the steps)
      * Since the system has control over what tools are used and when, it has stronger guarantees, allowing it to be fast and correct
    * Parallelization, incremental builds, distributed builds, tools as dependencies to support multiple platforms
    * Visibility: each artifact can control which other artifacts can use it as a dependency (public, private, allow-list)
    * Trade-offs: how the build is structured requires forethought, overhead of writing the buildfiles

### Critique: Google’s Code Review Tool

* The main goal of code review is to improve the readability and maintainability of the code base
  * This is supported by processes, which in turn are supported by tooling
* Google's Critique tool follows these principles:
  * Simplicity: fast, clean UI
    * Standalone tools (Critique, Code Search, editors)
  * Foundation of trust: e.g. not requiring another review after changes
  * Generic communication: simple comment fields over complicated protocols
  * Workflow integration: Code Search, web-based editor, viewing test results
* Code review flow:
  1. Create change
    * Automatic builds, tests, and code analyzers
    * Critique shows results from the above, as well as the diff as the reviewer will see it
  2. Request review
    * Tooling helps finding a reviewer that has the authority to approve, is familiar with the code, and is available
  3. Comment
    * Unresolved by default, but optional/informational comments can be added as resolved
    * Anyone can comment on changes, not just the assigned reviewer
  4. Modify changes and reply to comments
    * Snapshots between the original and any further changes are available
  5. Change approval
    * To be committed, a change requires
      * "LGTM" by any reviewer
      * "Approval" by gatekeeper
      * No unresolved comments (but author themself can resolve these)
  6. Commit a change
    * Automatic analyzers and precommit hooks

### Static analysis

* Static analysis: programs analyzing code to find potential issues that can be diagnosed without executing the program
* Aside for detecting issues, it codifies best practices, keeps code readable, warns about deprecations and reduces tech debt
* Focus on developer happiness: avoid false positives, show clear messages, listen to feedback
* Make static analysis a part of the core workflow: e.g. code review
* Empower users to contribute: domain experts can write new analysers, others can fix bugs
* Google has *Tricorder* tool
  * Criterias for checks:
    1. Understandable outputs
    2. Actionable and easy to fix problems
    3. < 10% false positives
    4. Have potential for significant impact on code quality
  * Quick options for fixing an issue as suggested, for the reviewer to flag a problem as "please fix", and for sending "not helpful" feedback
  * Default analyzers and project specific optional ones
  * Different checks and reactions are suitable for IDE, compile-time, presubmit, code review, and Code Search

### Dependency Management

> All else being equal, prefer source control problems over dependency-management problems

* The problem is managing a network of dependencies and their changes **over time**
  * Conflicting requirements, especially in diamond dependencies
  * Still an unsolved problem at Google: Tested many ways that didn't work, have some ideas what might work
* In programming project importing is free, in software engineering project you need to consider the trade-off between developer time and maintenance time
  * Google favors using developer time, i.e. in-house implementations
  * Including an import requires two persons to be willing to be marked as owners, being responsible for any maintenance
    * Once included, more code can easily start depending on the package, making it critical
    * Someone who included a package is unlikely to have real experience with its implementation
    * Over time the owners are likely to change jobs within or outside Google
    * Package isn't updated when it's not required, meaning the version in use might be very old
    * When a need to upgrade rises, it might be a costly operation
* Theoretical options for dependency management
  1. Nothing changes, aka. the static dependency model
    * Only allow non-breaking bug fixes, no other changes
    * Not practical due to the assumption of indefinite stability
  2. Semantic versioning
    * Introduces possibility for conflicting requirements
    * *Version-satisfiability solvers* can help find working combinations, but don't guarantee that such combinations exists
    * Works only on limited scales because
      * SemVer release is always just the developer's *estimate* about the compatibility of the changes
      * SemVer overconstrains: breaking change in one API requires major version bumb, even if the affects only small percentage of usage (i.e. dependencies should be fine grained)
      * SemVer is unlikely to work with unexpected usage of APIs (Hyrum's law)
  3. Bundled distribution models
    * Combine all dependencies to a distribution with guaranteed interoperability, limiting the number of dependencies to one
    * In practice just outsources the dependency management to (in-house) distributor
  4. Live at HEAD
    * Dependency-management extension of trunk-based development: throw away versioning, there's only HEAD
    * Relies on dependency providers testing changes against the entire ecosystem before committing
      * How to get OSS providers to do that (from technical or motivational perspective)?
      * All downstream users would need tests and CI pipelines
      * Breaking changes would require automatic tooling for downstream users to fix their code before breaking changes can be published
    * Lengthy argument that this would be the ideal solution if we'd have unlimited free computational resources and everyone would be willing to change to this approach at the same time
* Exporting dependencies
  * Can be drag on organisations reputation if implemented or maintained poorly
  * Don't release things without a plan (and a mandate) to support it for the long term

### Large-Scale Changes

* *Large Scale Change* (LSC): set of logically related changes that can't practically be submitted as a single atomic unit
* Barriers to atomic changes
  * Technical limitations, e.g. linearly scaling VCS operations run out of resources as the number of files grow
  * Likelihood for merge conflicts increases with the number of files and people working on them
  * Haunted graveyards prevent automatic changes, holding rest of the codebase back
  * Heterogeneity, e.g. multiple tools and guidelines makes it difficult to change different approaches to the same problem at once
  * Testing changes to many files triggers many tests, which won't be completed until the trunk has changed and the process needs to be restarted
  * Code review becomes tedious and error prone
* At Google
  * LSCs are almost always generated with automated tooling
    * Cleaning up anti-patterns with analysis tooling
    * Replacing uses of deprecated library features
    * Migrating users from old system to new one
  * Majority of LSCs have near-zero functional impact
  * LSC infrastructure
    * Policies and culture
      * Traditionally the effort required to generate a change and to review it have been somewhat equal
        * Tooling to easily create LSCs has skewed this balance
        * Lightweight approval process for LSCs, handled by experts
      * Culture of trust for code owners to accept LSCs to affect their code
    * Change management: *Rosie* tool for sharding a change to smaller pieces and handling the proces for the pieces
    * Comprehensive test suite and infrastructure to run it
    * Language support: some languages are easier for LSCs than others
      * Statically typed languages > dynamically typed languages
      * Automatic formatters are crucial
  * LSC process
    1. Authorization
      * Author documents the reason for proposed change and its estimated impact
      * Committee provides feedback on how to proceed
      * Committee processes appeals raised by code owners
    2. Change creation: author produces the code edits
    3. Shard management
      1. *Rosie* shards the change based on "project boundaries and ownership rules" to changes that can be submitted atomically
        * Each shard moves through a pipeline separately
      2. Testing
      3. Reviews
        * Local owners tend to trust LCSs and give only cursory reviews, so they are used only when the context requires it
        * Usually a global approver approves all shards at once, using "pattern-based tooling"
      4. Submitting the changes to repo, including running all regular checks
    4. Cleanup: depending on LSC might include removing old systems or preventing additional introductions via tooling

### Continuous Integration

* CI should define:
  * Which tests to run when in the development/release workflow, as code and other changes are continuously integrated into it
  * How to compose the system under test at each point, balancing concerns like fidelity and setup cost
* Core concepts
  * Fast feedback loops ("shift left")
    * *Canarying*: deploying to small percentage of production first
      * *Version skew*: problems caused by having multiple incompatible parts of the system at play
    * Feature flags
  * Automation
    * Continuous Build: run tests, combine code and configuration to a Release Candidate (RC), e.g. a docker image
    * Continuous Delivery: "promote" RC through various environments, testing it on each, until promotion to production
  * Continuous Testing
    * What to test and when?
      * Running all tests on presubmit is too expensive (wasted engineer time)
        * Restrict by scope or by model predicting likelihood of detecting failures
        * Run only fast and reliable ones
      * Running large tests against RC and production release
  * CI challenges
    * Which change caused the problem and which system did it happen in?
    * Resource constraints
    * Failure management: what to do when tests fail?
  * Hermetic testing
    * Running against entirely self-contained test environments
    * Greater determinism (stability): failure is likely due to the change
    * Greater isolation: testing doesn't affect production, and vice versa
* At Google: Test Automation Platform (TAP), a global continuous build
  * Daily handling 50k unique changes, running 4B individual test cases
  * Change passing presubmit tests has 95%+ likelihood to pass the rest of the tests and is therefore allowed to be integrated
    * TAP then runs rest of the tests asynchronously just in case
      * Since changes happen more than one a second, tests are run against batches of changes
      * If a problem is detected, each change in the batch is rerun against the failing tests separately
    * Each team has a "build cop" who drops whatever they're doing to rollback/fix problems with integrated changes
      * Since rollback is seen as the safest option, TAP automatically rolls back if it's confident it knows which change caused the failure
  * Since running tests is resource constrained, TAP analyzes change's downstream dependency graph to determine which tests to run
    * Small changes run faster, encouraging smaller commits
* Building a CI system is expensive, but it shifts the costs left, saving in negatively affecting the users and reducing stressful fire-fighting

### Continuous Delivery

* Both initial time to market, and the velocity of subsequent changes are competitive advantages
  * Testing ideas to get feedback
  * Responding to feedback or changes in environment
* Faster is safer: release frequently and in small batches, as this "results in higher quality"
  * Releasing small incremental changes with a safety net is a better approach than bigger releases with lots of planning, governance and oversight
  * Reduce and remove repetitive overhead of frequent releases
* Frequent releases lowers the mental and monetary cost of missing a deadline
* Use phased rollouts and A/B tests on health metrics to ensure quality
  * Just pushing an update without any changes on Android can cause statistically significant changes to device and user behaviour, thus A/B testing including the old version is required to see if the changes can actually be attributed to the new feature
* "Flag guard" features in the repository but not yet ready for production
* "Migrating to a microservice architecture has best ROI"
* Being able to deploy often doesn't mean you have to deploy often

### Compute as a Service

* Scale requires a common infrastructure for running workloads in production
* Google's *Borg* was a precursor to many of today's CaaS architectures like Kubernetes
  * SFTP + SSH doesn't scale when number of servers increases
  * Some parts of the deployment and monitoring can be automated with e.g. shell scripts
  * First step towards CaaS: central service that knows all machines and automates scheduling and deployment
  * Add automated monitoring and some remedies like rebooting, then avoid scheduling any work to machines while waiting for human intervention
    * While waiting, deploy to another machine, if available
  * Thus far it's been assumed one machine runs one program, which is wasteful
    * Specify resource requirements for each program and let the service handle deploying them to machines with available resources
  * Use VMs to enforce programs use only the resources they claimed they would, and isolate programs to avoid conflicts
  * VMs add overhead to resource usage and startup time
  * Borg design started in 2003, ended up adopting containers based on cgroups, chroot jails, bind mounts and/or overlay filesystems
* Writing software to managed compute
  * Architect for failure
    * Program should work even if one of the machines (or containers) it runs on is killed, and the work in progress is moved to another machine ("self-healing")
      * "Pets versus cattle"
        * If a pet server is broken, a human comes to nurse it back to life; it's difficult to replace.
        * If replica001 is broken, it's automatically replaced by another without anyone caring
    * If work is assigned equally between the workers at the start, one failing worker can cause the whole job to be completed significantly later. Assigning the work to workers in small chunks dynamically during the process mitigates the issue
  * Batch versus serving
    * Batch jobs are short lived and care about throughput
    * Serving jobs are long lived, care about latency, and likely have longer startup times
    * Serving job's work is usually naturally chunked to small requests
    * Google uses slack in machines with serving processes to run batch processes, which are killed if the resources are needed by serving processes, effectively running batches for free
  * Cattle processes' state is lost when it's killed, so actual state needs to be stored in external persistent storage
    * Storages themselves can be cattle with many replicas, but require specialized storage solutions
  * Connecting to a service
    * If application uses hardcoded hostnames, that host is not cattle
      * Service discovery: a separate system than identifies applications by some identifier that's persistent across restarts
    * Applications should handle retries gracefully in case target service is killed
    * Temporary network outage might result in duplicate replica being created
      * Replicas should use service discovery to determine which one is the current one, and the other should self-terminate
* While machines changes over time, only the container software needs to adapt, not the application running inside
* Compute infrastructure has a lock-in factor when code is written to take advantage of the properties and helper services of the system

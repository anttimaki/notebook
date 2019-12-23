# GitHub Actions

According to GitHub:

> GitHub Actions makes it easy to automate all your software workflows, now with
> world-class CI/CD. Build, test, and deploy your code right from GitHub. Make
> code reviews, branch management, and issue triaging work the way you want.

Actions are defined in YAML files which should be stored in the repository under
`.github/workflows/`. Here's an example of how one might lint and run tests on a
project that uses Django and React:

```
name: Django/React Test & Lint

# When should the action be executed. If executed on push, the action might be
# completed by the time a PR is opened. Alternatively the action can be executed
# when a new PR for e.g. master branch is opened.
on: [push]

# Jobs run on paraller by default.
jobs:
  # Human readable name for the job.
  python_checks:

    # Multiple environments are available.
    runs-on: ubuntu-18.04

    # Set environment variables.
    # GitHub Secrets defined for the repo are available through ${{ }} syntax.
    env:
      SECRET_KEY: ${{ secrets.DJANGO_SECRET_KEY }}
      DB_HOST: localhost
      DB_NAME: project
      DB_USER: root
      DB_PASSWORD: root

    # Steps within the job run sequentially.
    steps:
    - uses: actions/checkout@v1
      with:
        submodules: true

        # How much commit history should be checkouted. Too shallow fetch-depth
        # may cause submodule checkouts to fail if the submodule has changes
        # that haven't been updated to this repo yet.
        fetch-depth: 50

        # By default, the action has access to the repo where it resides. To
        # access submodules in different repositories, we must save developer's
        # Personal Access Token as a GitHub Secret. Ideally the "developer" is a
        # dummy account with only read access to the repositories. 
        token: ${{ secrets.ACTIONS_ACCESS_TOKEN }}

    - name: Create log files for Python
      run: |
        sudo mkdir /var/log/project
        sudo touch /var/log/project/debug.log
        sudo touch /var/log/project/info.log
        sudo touch /var/log/project/error.log
        sudo chmod -R 777 /var/log/project

    - name: Set up MySQL timezones
      run: mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -uroot -proot mysql

    - name: Set up Python
      uses: actions/setup-python@v1
      with:
        python-version: 3.6.9

    # Apt can be used to install stuff.
    - name: Install dependency for mysqlclient Python package
      run: sudo apt install libmysqlclient-dev

    # Pip can be used to install stuff.
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt

    # Django management commands are available.
    - name: Run tests
      run: python manage.py test

    # Ignored rules:
    # W503: line break before binary operator
    # W504: line break after binary operator
    - name: Run linter
      run: |
        pip install flake8
        flake8 . --count --ignore=W503,W504

  javascript_checks:
    runs-on: ubuntu-18.04
    
    steps: 
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1
      with:
        node-version: '12.x'
    
    - name: Install dependencies
      run: cd app && npm install
    
    - name: Run tests
      run: cd app && npm run test
    
    # `npx` uses eslint found in node_modules folder.
    - name: Run linter
      run: cd app && npx eslint src --ext=.js,.jsx

    - name: Verify build process
      run: cd app && npm run build:prod
```

The state of actions can be seen e.g. on the branch list (small icons) and on
pull request pages (status box).

Free GitHub account includes 2000 minutes of action execution time per month for
free and more can be purchased. The minutes use multipliers based on the system
the actions are executed on: 1, 2 and 10 for Linux, Windows and MacOS,
respectively.

# Kronus Property Management Application

Kronus is a web application built with AngularJS and SlimPHP to manage properties from purchase to sold.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project builds off of the LAMP (with PHP) stack. If you don't already have the stack installed on your local machine, you will have to install it before continuing.

[Simple xAMP setup for any OS](http://www.ampps.com/download)

### Installing

1. Create Project

Navigate to your development environment's project folder. Create a new directory to hold this project. Inside of that folder, create another directory called public_html.

For example:

```
/var/www/html/*project-title*/public_html
```

2. Add Project Files

Download the project's contents into this directory:

[Download Here](https://github.com/paulturnerblatchley/sc/)

Or you can clone it:

```
git clone https://github.com/paulturnerblatchley/sc.git
```

3. Create Database

In your browser, go to PhpMyAdmin

```
http://localhost/phpmyadmin
```

And import the database.sql file from

```
/server/database.sql
```

The database comes with some sample data.

4. Connect Project to Database

Take the name of the database you just created, the database user, and password and input those values into /server/config.php

```
define('DB_USERNAME', '');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_NAME', '');
```

5. Test the Connection

Navigate to the site in your browser. You should now see the login portal. An initial user is provided with the database.

EMAIL: sample@user.com
PW: example

This should take you to the main properties page.

After you log in, make you go the user settings page and create a new user account for yourself and delete the sample account. 

## Built With

* [AngularJS](https://angularjs.org/) - The web framework used to manage the front-end
    * Dependencies
     * angular-animate
     * angular-resource
     * angular-route
     * ng-file-upload
     * ng-map
     * ngStorage
     * smart-table
     * ui-grid
* [SlimPHP](https://www.slimframework.com/) - A simple PHP framework for creating an API for server communication.
* [jQuery](https://jquery.com/) - Used for simple DOM manipulations
* [Bootstrap](http://getbootstrap.com/) - Rapid Development Styles
* [MomentJS](https://momentjs.com/) - Date Manipulation
* [Toastr JS](https://github.com/CodeSeven/toastr) - User Notifications


## Versioning

Currently in Pre-Alpha, version 0.0.0 | Full Versioning will begin at Alpha phase.

## Authors

* **Paul Turner Blatchley** -  [paulturnerblatchley](https://github.com/paulturnerblatchley)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to [Thinkster.io](https://thinkster.io/tutorials/angularjs-jwt-auth) for giving me the initial idea to combine AngularJS with SlimPHP for a simple setup compatible with the LAMP stack

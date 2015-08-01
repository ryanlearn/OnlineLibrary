<?php 
    session_start();
?>
<!DOCTYPE html>

<html data-ng-app="lib" id="ng-app">
<head>
    <title>Library</title>


    <!--<link href="Content/bootstrap.min.css" rel="stylesheet" />-->

   


    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <link id="ie-style" href="acme/css/ie.css" rel="stylesheet">
        <style>
            .donut-graph .inner{
                background: none;
                background-image: url(./img/inner2.png) !important;
                background-repeat: no-repeat;
                background-size: 100%;
                pointer-events: none;
            }
        </style>
    <![endif]-->

    <!--[if IE 9]>
        <link id="ie9style" href="acme/css/ie9.css" rel="stylesheet">
    <![endif]-->

    <!--[if lte IE 8]>
      <script src="Scripts/json3.js"></script>
    <![endif]-->

</head>
<body>

    <div data-ng-controller="UserController">
                <!--<div data-ng-include src="'/app/partials/header.html'" ></div>-->
                <div data-ng-view></div>
    </div>

    <!-- Vendor Libs: jQuery only used for Bootstrap functionality -->
    <script src="Scripts/angular.js" type="text/javascript"></script>
    <script src="Scripts/angular-resource.js" type="text/javascript"></script>
    <script src="Scripts/angular-route.js" type="text/javascript"></script>



    <!-- UI Libs -->
    <!--<script src="Scripts/bootstrap.js"></script>-->
    


    <!-- App libs -->
    <script src="app/app.js" type="text/javascript"></script>

    <!-- Controllers -->
    <script src="app/controllers/userController.js"></script>
    <script src="app/controllers/registerFormController.js"></script>
    <script src="app/controllers/bookController.js"></script>


    <!--Services-->
    <script src="app/services/loginService.js"></script>
    <script src="app/services/adaptUserService.js"></script>
    <script src="app/services/bookService.js"></script>


    <!-- Directives -->



    <!--Filters-->
    <script src="app/filters/filters.js"></script>


</body>

</html>
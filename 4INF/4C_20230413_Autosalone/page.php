<?php require "include/check.php"; ?>
<?php require "include/database.php"; ?>
<!DOCTYPE html>
<html>
<head>
    <title> Pagina di test - PHP login </title>
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />
    <!-- Font Awesome icons (free version)-->
    <script src="https://use.fontawesome.com/releases/v5.15.1/js/all.js" crossorigin="anonymous"></script>
    <!-- Google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:500,700" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Muli:400,400i,800,800i" rel="stylesheet" type="text/css" />
    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/css.css" rel="stylesheet" />
</head>
<body>
<!-- Navigation-->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
    <a class="navbar-brand js-scroll-trigger" href="#page-top">
        <span class="d-block d-lg-none">Rossi Marcello</span>
        <span class="d-none d-lg-block"><img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="../assets/img/profile.jpg" alt="" /></span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <?php
            if($_SESSION['level'] === '0') {
                echo '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#list">Auto in vendita</a></li>';
                echo '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#sold">Auto selezionate</a></li>';
            }else{
                echo '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="#admin">Administrator</a></li>';
            }
            echo '<li class="nav-item"><a class="nav-link js-scroll-trigger" href="destroy.php">Log Out</a></li>'
            ?>
        </ul>
    </div>
</nav>
<div class="container">
    <div class="col-md-12">
        <center>
            <div class="col-md-12">
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <?php
                    if($_SESSION['level'] === '0' ){
                        include("page/start_shop_cars.php");
                        echo '<hr class="m-0" />';
                        include("include/message.php");
                        echo '<hr class="m-0" />';
                        include("page/start_users_cars.php");
                    }else{
                        include("page/start_admin_cars.php");
                        echo '<hr class="m-0" />';
                        include("include/message.php");
                        echo '<hr class="m-0" />';
                    }
                    ?>
                </div>
        </center>
    </div>
</div>

<!-- Bootstrap core JS-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Third party plugin JS-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
<!-- Core theme JS-->
<script src="js/scripts.js"></script>
</body>
</html>
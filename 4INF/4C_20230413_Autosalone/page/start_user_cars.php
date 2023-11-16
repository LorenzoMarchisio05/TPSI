<section class="resume-section" id="sold" style="margin-top: -60px;">
    <div class="resume-section-content">
        <h2 class="mb-5">Auto Selezionate</h2>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingTwo">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Visualizza auto
                    </a>
                </h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body">
                    <table class="table table-striped table-hover" style='line-height: 50px'>
                        <thead>
                        <tr>
                            <th scope="col">Targa</th>
                            <th scope="col">Costruttore</th>
                            <th scope="col">Modello</th>
                            <th scope="col">Cilindrata</th>
                            <th scope="col">Azione</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $sql = "SELECT * FROM user_cars WHERE email='".$_SESSION['user']."'";

                        foreach($pdo->query($sql) as $row) {
                            echo "<tr><form action='page/save_cars_delete_users_cars.php' method='post'>";
                            include("table_users.php");
                            echo "<td><input type='submit' class='btn btn-primary' value='Delete'></td>";
                            echo "</form></tr>";
                        }
                        ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

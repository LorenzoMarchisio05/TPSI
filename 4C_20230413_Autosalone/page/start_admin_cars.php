<section class="resume-section" id="admin" style="margin-top: -60px">
    <div class="resume-section-content">
        <h2 class="mb-5">Auto disponibili</h2>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingTwo">
                <h4 class="panel-title">
                    <a href="#collapseTwo" class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" aria-expanded="false">
                        Concessionaria auto
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
                            <th scope="col" colspan="2">Azione</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        $sql="SELECT * FROM cars";
                        foreach($pdo->query($sql) as $row) {
                            echo "<tr><form method='post'>";
                            include("table_admins.php");
                            echo "<td><input type='submit' class='btn btn-primary' value='Remove' formaction='page/remove_shop_cars.php'></td>";
                            echo "<td><input type='submit' class='btn btn-primary' value='Update' formaction='page/update_shop_cars.php'></td>";
                            echo "</form></tr>";
                        }
                        ?>
                        </tbody>
                    </table>
                </div>
                <?php include("modal_insert.php");?>
            </div>
        </div>
    </div>
</section>

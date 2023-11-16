<section class="resume-section" id="list">
    <div class="resume-section-content">
        <h2 class="mb-5">Auto in vendita</h2>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Seleziona auto
                    </a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
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
                            $sql="SELECT * FROM cars";
                            foreach($pdo->query($sql) as $row){
                                echo "<tr><form action='page/save_user_cars_delete_cars.php' method='post'>";
                                include "table_users.php";
                                echo "<td><input type='submit' class='btn btn-primary' value='add'></td>";
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
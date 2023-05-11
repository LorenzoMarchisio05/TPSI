<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Inserisci Auto
</button>

<!--Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-lg modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Inserisci Auto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="save_data" class="needs-validation" novalidate>
                    <table class="table table-striped table-hover" style="line-height: 50px">
                        <thead>
                        <tr>
                            <th scope="col">Targa</th>
                            <th scope="col">Costruttore</th>
                            <th scope="col">Modello</th>
                            <th scope="col">Cilindrata</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                            echo "<td><input type='text' name='plate' class='form-control' ></td>";
                            echo "<td><input type='text' name='brand' class='form-control' ></td>";
                            echo "<td><input type='text' name='model' class='form-control' ></td>";
                            echo "<td><input type='text' name='capacity' class='form-control' ></td>";
                        ?>
                        </tbody>
                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
                <button type="submit" form="save_data" formaction="page/save_cars.php" formmethod="POST" class="btn btn-primary" >Salva</button>
            </div>
        </div>
    </div>
</div>
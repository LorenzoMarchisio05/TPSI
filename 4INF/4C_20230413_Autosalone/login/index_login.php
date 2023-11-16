<section class="resume-section" id="login">
    <div class="resume-section-content">
        <h2 class="mb-5">Login</h2>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Login
                    </a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                    <form method="POST" action="index.php" class="needs-validation" novalidate>
                        <div class="modal-body">
                            <div class="form-row ">
                                <div class="form-group col-sm-12">
                                    <label for="user" class="h6">Email as User</label>
                                    <input type="email" class="form-control" id="user_login" name="user" placeholder="Enter Email" required>
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div class="form-group col-sm-12">
                                    <label for="password" class="h6">Password</label>
                                    <input type="password" class="form-control" id="password_login" name="password" placeholder="Enter password" required>
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Please choose a password.</div>
                                </div>
                            </div>
                            <p></p>
                            <p class="text-secondary"><small></small></p>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" name="send" class="btn btn-secondary" data-dismiss="modal">Login</button>
                            <button type="reset" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="resume-section" id="register">
    <div class="resume-section-content">
        <h2 class="mb-5">Register</h2>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingTwo">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        Register
                    </a>
                </h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body">
                    <form role="form" id="contactForm" action="register.php" method="POST" class="needs-validation" novalidate onchange='confirm.setCustomValidity(confirmed.value != password.value ? confirm.value="" : "")'>
                        <!--------------------------------------------------------------------------------------------------------------------->
                        <div class="form-row ">
                            <!--------------------------------------------------------------------------------------------------------------------->
                            <div class="form-group col-sm-4">
                                <label for="user_register" class="h6">Email as User</label>
                                <input type="email" class="form-control" id="user_register" name="user" placeholder="Enter Email" required>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a email.</div>
                            </div>
                            <!--------------------------------------------------------------------------------------------------------------------->
                            <div class="form-group col-sm-4">
                                <label for="password" class="h6">Password</label>
                                <input type="password" class="form-control" id="password_register" name="password" placeholder="Enter password" required>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a password.</div>
                            </div>
                            <!--------------------------------------------------------------------------------------------------------------------->
                            <div class="form-group col-sm-4">
                                <label for="password" class="h6">Confirm</label>
                                <input type="password" class="form-control" id="confirm" name="confirmed" placeholder="Confirm password" required>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please insert a confirm.</div>
                            </div>
                            <!--------------------------------------------------------------------------------------------------------------------->
                        </div>
                        <div class="form-row ">
                            <!--------------------------------------------------------------------------------------------------------------------->
                            <div class="form-group col-sm-4">
                                <label for="name" class="h6">Name</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" required>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a name.</div>
                            </div>
                            <!--------------------------------------------------------------------------------------------------------------------->
                            <div class="form-group col-sm-4">
                                <label for="password" class="h6">Surname</label>
                                <input type="text" class="form-control" id="surname" name="surname" placeholder="Enter Surname" required>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a surname.</div>
                            </div>
                            <!--------------------------------------------------------------------------------------------------------------------->
                            <div class="form-group col-sm-4">
                                <label for="password" class="h6">Date</label>
                                <input type="date" class="form-control" id="date" name="date" placeholder="Enter Date" required>
                                <div class="valid-feedback">Looks good!</div>
                                <div class="invalid-feedback">Please choose a date.</div>
                            </div>
                            <!--------------------------------------------------------------------------------------------------------------------->
                        </div>
                        <!--------------------------------------------------------------------------------------------------------------------->
                        <div class="form-row">
                            <div class="form-group col-sm-12 p-2">
                                <label for="message" class="h6">Message</label>
                                <textarea id="text" name="text" class="form-control" rows="3" placeholder="Enter your message" required></textarea>
                            </div>
                        </div>
                        <!--------------------------------------------------------------------------------------------------------------------->
                        <div class="modal-footer">
                            <button type="submit" id="register" class="btn btn-secondary" value="register" name="register">Sign up</button>
                            <!--------------------------------------------------------------------------------------------------------------------->
                            <button type="reset" id="form-reset" class="btn btn-secondary">Cancel</button>

                            <!--------------------------------------------------------------------------------------------------------------------->
                        </div>
                        <!--------------------------------------------------------------------------------------------------------------------->
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<?php
    
    class Auth
    {
        public function DoLogin()
        {
            $email = strip_tags(strtolower($_POST['email']));
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $password = $_POST['password'];
                if($this->ValidateLogin($email,$password)) {
                    $sessionId = uniqid();
                    //Set Session Variable and Cookie
                    $_SESSION['user_logged_in'] = $sessionId;
                    $_SESSION['uid'] = GetUserIdFromEmail($email);
                    setcookie('chunkr',$sessionId,time()+24400,'/','/');
                }
            }else{
                ThrowError('That email was invalid. Please try again.');
            }
        }
        public function DoRegister()
        {
            $email = strip_tags(strtolower($_POST['email']));
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $password = $_POST['password'];
                if($this->ValidateLogin($email,$password)) {
                    //that would be bad - that'd mean the user already exists
                    ThrowError('Oops! That user already exists. Please register with a different email address.');
                }else{
                    //kick this pig. Insert the new user.
                    $salt = uniqid();
                    $hashed = crypt($GLOBALS['APPDB']->Quote($password),$salt);
                    $init = $GLOBALS['ISC_CLASS_DB']->Query("
                        INSERT INTO user
                        (email,password,salt)
                        VALUES
                        ('$email','$hashed','$salt')
                    ");
                }
            }
        }
        
        public function UserIsAdmin($email)
        {
            $adminQuery = $GLOBALS['APPDB']->Query("SELECT COUNT(*) FROM user WHERE isadmin = 1 AND email = '$email'");
            if($GLOBALS['APPDB']->FetchOne($adminQuery) > 0){
                return true;
            }
            return false;
        }
        
        public function DoLogout()
        {
            setcookie('chunkr','',time()-10000,'/','/');
            unset($_SESSION['user_logged_in']);
            unset($_SESSION['uid']);
            
        }
        /**
         * Show Forgot Password Screen
         *
         */
        public function ForgotPassword()
        {
            die(Parse('forgot')); 
        }
        
        public function EmailResetLink()
        {
            //get the email from the post and validate
            //generate the token and insert it in the database
            //send a password reset email.
        }
        
        public function ResetPassword($token)
        {
            //confirm the token is in the db
            //show them the change password screen - make them enter it twice
        }
        
        public function UpdateUser($email,$password='') //make them enter the password twice...
        {
            //get uid from session
            //update email for that uid
            //did they send a password?
            //update password for that uid
        }
        
        /*
         * Gets everything from the DB for this user in an array
         *
         */
        private function GetUserFromEmail($email)
        {
            $pull = $GLOBALS['APPDB']->Query("SELECT * FROM user WHERE email = '" . $GLOBALS['APPDB']->Quote($email) . "'");
            return (int)$GLOBALS['APPDB']->Fetch($pull);
            
        }
        
        /*
         * Gets the User ID based on the email address
         *
         */
        
        private function GetUserIdFromEmail($email)
        {
            $pull = $GLOBALS['APPDB']->Query("SELECT userid FROM user WHERE email = '" . $GLOBALS['APPDB']->Quote($email) . "'");
            return (int)$GLOBALS['APPDB']->FetchOne($pull);
        }
        
        private function ValidateLogin($email,$password,$adminRequest=false)
        {
            $pull = $GLOBALS['APPDB']->Query("SELECT salt FROM user WHERE email='$email'");
            $salt = $GLOBALS['APPDB']->FetchOne($pull);
            if(!$salt){
                ThrowError('Oops! That email address was not found. Please try again.');
            }
            $hashed = crypt($GLOBALS['APPDB']->Quote($password),$salt);
            $validateCall = $GLOBALS['APPDB']->Query("SELECT COUNT(*) FROM user WHERE email = '$email' AND password = '$hashed'");
            if ($GLOBALS['APPDB']->FetchOne($validateCall) > 0) {
                if($adminRequest){
                    if(!UserIsAdmin($email)){
                        ThrowError('That user is not an admin user');
                    }
                }
                return true;
            }else{
                ThrowError('Oops! That email/password combination was not found. Please try again.');
            }
        }
    }
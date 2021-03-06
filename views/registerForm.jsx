var React = require('react');
var Layout = require('./layout');

class Register extends React.Component {

    render () {
        return (<Layout>

            <div class="new-header">
                <h1>Register</h1>
            </div>

            <div class="container">
                <form method="POST" action="/register" autocomplete="off">

                    <div class="form-row">
                        <div class="col">
                            <label for="username">Username</label>
                            <input type="text" class="form-control form-control-lg" name="username" placeholder="Enter your username" required/>
                        </div>

                        <div class="col">
                            <label for="password">Password</label>
                            <input type="password" class="form-control form-control-lg" name="password" placeholder="Enter your password" required/>
                        </div>
                    </div>

                    <br/>

                    <div class="form-row">
                        <div class="col">
                            <label for="email">Email</label>
                            <input type="text" class="form-control form-control-lg" name="email" placeholder="Enter your email" required/>
                        </div>

                        <div class="col">
                            <label for="contact_num">Contact No.</label>
                            <input type="password" class="form-control form-control-lg" name="contact_num" placeholder="Enter your number" required/>
                        </div>
                    </div>

                    <br />

                    <button type="submit" class="btn btn-dark btn-lg float-right">Register</button>

                </form>
            </div>

        </Layout>)  // end of return

    }  // end of rendering
}  // end of class

module.exports = Register;
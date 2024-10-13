import React, { Component } from 'react';
import HeaderBox from '../../components/HeaderBox';
import Transaction from '../Transaction';
import RIghtSidebar from '@/components/RIghtSidebar';

class Home extends Component {
    constructor(props) {
        super(props);
        // this.loggedIn = {
        //     fname: "Alfren",
        //     lname: "Alvaran",
        //     email: "alvaranalfren1@gmail.com",

        //     name: "Alfren Alvaran" 
        // };
        
        const user = JSON.parse(localStorage.getItem('user')) || {}
        console.log(user);
        this.state = {
            loggedInUser: user
        }
    }


    // getFullName() {
    //     return `${this.loggedIn.fname} ${this.loggedIn.lname}`;
    // }

    render() {
          const { loggedInUser } = this.state;
        return (
            <section className="home">
                <div className="home-content">
                    <header className="home-header">
                        <HeaderBox
                            type="greeting"
                            title="Welcome!"
                            user={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                            subtext="Access & manage your account and transactions efficiently"
                        />
                    </header>

                    RECENT TRANSACTIONS
                </div>


                <RIghtSidebar

                    user={loggedInUser}
                    transaction={[]}
                    banks={[{ currentBalance: 143.55 }, {}]}
                />


            </section>
        );
    }
}

export default Home;

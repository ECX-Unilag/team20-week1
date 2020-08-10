import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Official = (props) => {

    const [redirect, setRedirect] = useState(null)
    useEffect(() => {
        const navList = document.querySelectorAll("li");
        navList.forEach(list => {
            if (list.classList.contains("active")) {
                list.classList.remove("active");
            }
        })
        navList[2].style.display = "none";
        navList[1].classList.add("active");

        const form = document.querySelector("form");
        const loading = document.querySelector(".loading");
        const loginBtn = document.querySelector(".login-btn");
        const failed = document.querySelector(".failed");
        form.onsubmit = handleSubmit;

        function handleSubmit(e) {
            e.preventDefault();
            loginBtn.style.display = "none"
            loading.style.display = "flex";

            let formData = new FormData(form)
            let username =  formData.get("username");
            let password = formData.get("password");
            let Params = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${username}&password=${password}`,
                method: "POST"
            };
            const sendData = async function(){
             const res = await fetch("https://cms-team20.herokuapp.com/api/admin/dashboard", Params);
                const data = await res.json();
                loading.style.display = "none";
                loginBtn.style.display = "flex";
                if (data.error){
                failed.style.display = "flex";
                failed.innerHTML = `<h6>Error: ${data.error}</h6>`
                } else {
                failed.style.display = "none";
                props.updateData(data);
                setRedirect("/administrative");
                }
            }

            sendData().catch(err => {
                loading.style.display = "none";
                loginBtn.style.display = "flex";
                failed.style.display = "flex";
                console.log(err);
            });
        }
    }, [props])
    if(redirect === null){
    return (
        <>
        <div data-aos="fade-right" className="container-xl container-fluid">
        <Header/>
            <div className="login">
                <h3>Welcome</h3>
                <form>
                    <div className="loginId">
                        <label>Username</label>
                        <input type="name"name="username" autoComplete="true" required/>
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input type="password" name="password" required/>
                    </div>
                    <div className="login-btn">
                        <button type="submit">Login</button>
                    </div>
                </form>
            <div className="loading"><p>Loading...</p></div>
             <div className="failed">
                 <h6>Invalid username or password, Please try again</h6>
             </div>
            </div>
        </div>
        <Footer />
        </>
    )
    } else return (
        <Redirect to={redirect} />
    )
}

export default Official;
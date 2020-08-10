import React, { useEffect } from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Contact = () => {
    useEffect(() => {
        const navList = document.querySelectorAll("li");
        navList.forEach(list => {
            if (list.classList.contains("active")) {
                list.classList.remove("active");
            }
        })
        navList[2].style.display = "none";
        navList[4].classList.add("active");

            const form = document.querySelector("form");
            const loading = document.querySelector(".loading");
            const submitBtn = document.querySelector(".submit-btn");
            const success = document.querySelector(".success");
            const failed = document.querySelector(".failed");
            form.onsubmit = handleSubmit;

            function handleSubmit(e) {
                e.preventDefault();
                submitBtn.style.display = "none"
                loading.style.display = "flex";

                let formData = new FormData(form);
                let name = formData.get("name");
                let email = formData.get("email");
                let subject = formData.get("subject")
                let message = formData.get("message")

                let Params = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `name=${name}&email=${email}&subject=${subject}&message=${message}`,
                    method: "POST",
                };
                const sendData = async function(){
                 const res = await fetch("https://cms-team20.herokuapp.com/api/user/message", Params);
                 const data = await res.json();
                    loading.style.display = "none";
                    success.style.display = "flex";
                    failed.style.display = "none";
                    form.reset();
                    console.log(data);
            }

                sendData().catch(err => {
                    loading.style.display = "none";
                    success.style.display = "none";
                    submitBtn.style.display = "flex";
                    failed.style.display = "flex";
                    console.log(err);
                });
            }
    })
    return (
        <>
        <div className="container-xl container-fluid">
        <Header/>
           <div className="contact">
               <h2 data-aos="fade-right" className="text-center"><strong>Get In Touch</strong></h2>
            <div className="contact-form">
                <form>
                   <div className="name-email">
                        <input data-aos="fade-right" type="name" name="name" required minLength="3" placeholder="Firstname Lastname" pattern="[a-zA-Z]{3,}\s[a-zA-Z]{3,}"/>
                        <input data-aos="fade-left" type="email" name="email" required minLength="10" placeholder="Email"/>
                   </div>
                   <div className="subject-message">
                       <input data-aos="fade-left" type="name" name="subject" required minLength="10" placeholder="Subject"/>
                       <textarea data-aos="fade-right" name="message" placeholder="Your message" required minLength="20" ></textarea>
                   </div>
                   <div data-aos="fade-right" className="submit-btn">
                       <button type="submit">Send Message</button>
                   </div>
                   <div className="loading"><h4>Loading...</h4></div>
                   <div className="failed">
                       <h4>Send failed, Please try again</h4>
                   </div>
                   <div className="success">
                       <h4>Your message has been successfully sent</h4>
                   </div>
               </form>
            </div>
           </div>
        <Footer />
        </div>
        </>
    )
}
export default Contact;
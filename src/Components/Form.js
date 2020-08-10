import React, { useEffect } from "react";

const Form = () => {

    const originStates = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
    "Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
    "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT"]


    useEffect(() => {
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
            let number = formData.get("familyNo");
            let language = formData.get("language")
            let state = formData.get("state")

            let Params = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `name=${name}&number=${number}&language=${language}&state=${state}`,
                method: "POST",
            };
            const sendData = async function(){
             const res = await fetch("https://cms-team20.herokuapp.com/api/data-upload", Params);
             const data = await res.json();
                loading.style.display = "none";
                success.style.display = "flex";
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
    }, [])
    return (
    <div className="form-input">
    <h4 data-aos="fade-right">Please, kindly ensure the details provided are accurate and correct</h4>
    <form className="row">
        <div className="name-input col-12 col-sm-6 col-xm-6">
            <section data-aos="fade-right">
            <label>Family Name</label>
            <input type="name" name="name" required placeholder="Enter Family Name"/>
            </section>
        </div>
        <div className="family col-12 col-sm-6 col-xm-6">
            <section data-aos="fade-left">
            <label>Number of Family Members</label>
            <input type="number" name="familyNo" required min="1" placeholder="1"/>
            </section>
        </div>
        <div className="language col-12 col-sm-6 col-xm-6">
          <section data-aos="fade-right">
            <label>Native Language</label>
            <select name="language" id="language-select" required>
                <option value="">--Please choose your native language--</option>
                <option value="Yoruba">Yoruba</option>
                <option value="Hausa">Hausa</option>
                <option value="Igbo">Igbo</option>
            </select>
            </section>
        </div>
        <div className="residence col-12 col-sm-6 col-xm-6">
            <section data-aos="fade-left">
            <label>State of residence</label>
            <select name="state" id="state-select" required>
                <option value="">--Please choose your state--</option>
                {originStates.map(state => { return (
                    <option value={state} key={originStates.indexOf(state)}>
                    {state}</option>)}
                )}
            </select>
            </section>
        </div>
        <div className="submit-btn">
            <button data-aos="fade-up" type="submit">Submit</button>
        </div>
    </form>
    <div className="loading"><h4>Loading...</h4></div>
    <div className="failed">
        <h4>Error while uploading data, Please try again</h4>
    </div>
    <div className="success">
        <h4>Your data has been successfully uploaded</h4>
    </div>
</div>
    )
}
export default Form;
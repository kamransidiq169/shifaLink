export const Footer=()=>{
    return (<>
    <div className="footerContainer">
        <div className="leftFooter">
            <div className="shifaImage">
                <img src="https://shifa.net.au/wp-content/uploads/2023/05/col_logo_1.png"></img>
                <h2>ShifaLink</h2>
            </div>
            <p>ShifaLink is a Kashmiri-built platform dedicated to simplifying healthcare access. We connect patients with verified local doctors, enabling secure appointment booking, timely follow-ups, and a smoother care experience. Designed with cultural respect and modern reliability, ShifaLink empowers communities to take charge of their health — one click at a time.</p>
        </div>
        <div className="middleFooter">
            <h3>COMPANY</h3>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="rightFooter">
            <h3>GET IN TOUCH</h3>
          <ul>
            <li>7006040427</li>
            <li>kamransidiq97@gmail.com</li>
          </ul>
        </div>
    </div>
    <div className="copyright">
        <hr />
        <p>Copyright 2025@ShifaLink - All Rights Reserved.</p>
    </div>
    </>)
}
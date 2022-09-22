import React from "react"
import { Button, ButtonGroup } from "@aws-amplify/ui-react"
import Notelifylogo3 from "../ui-components/Notelifylogo3"
import Collaborate from "../ui-components/Collaborate"
import EasyToUse from "../ui-components/EasyToUse"
import AwsPowered from "../ui-components/AwsPowered"
import inApp from "../images/inApp.png"
import amplify from "../images/amplify.svg"

export const LandingPage = () => {
  return (
    <div className="container">
      <header
        style={{
          margin: "1.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Notelifylogo3 />

        <div>
          <ButtonGroup>
            <Button border={"none"} size="small" fontWeight={"normal"}>
              Login
            </Button>
            <Button
              style={{ borderColor: "#0DA2E7", color: "#0DA2E7" }}
              margin={"0"}
            >
              Sign up
            </Button>
          </ButtonGroup>
        </div>
      </header>
      <section className="hero">
        <h2>Unleash and <span className="vector">capture</span> your ideas</h2>
        <p><small>Organize your life and any project with notes, reminders, tasks and collaborations as easy as possible</small></p>
        <p>
          <Button variation="primary">Try Notelify for free</Button>
        </p>

        <div>
          <img src={inApp} className="in-app_img" alt="In app View" />
        </div>
      <div style={{textAlign: "center", padding: "3rem 0"}}>
        <h2>Everything your creativity needs</h2>
      </div>
      <div className="hero-about">
        <div>
          <div style={{margin: "-1rem", padding: 0}}><img src={amplify} alt="Amplify studio logo" /> <span style={{display: "inline-block", paddingLeft: "0.5rem"}}>Amplify Studio</span></div>
          <AwsPowered margin={"2.5rem 0"} padding={0} gap={0}/>
        </div>
        <div><Collaborate margin={"2rem 0"}/></div>
        <div><EasyToUse margin={"4rem 0"}/></div>
      </div>
      </section>

        <footer style={{fontFamily: "monospace", textAlign: "center", marginBottom: "2rem"}}>
          <p style={{marginBottom: "0"}}>September 2022, Aws Amplify x Hashnode Hackathon</p>
          <p style={{marginTop: "0"}}>Developed by <a href="https://osaretinfrank.me" target={"_blank"}>Osariemen Osaretin Frank</a></p>
        </footer>
    </div>
  )
}

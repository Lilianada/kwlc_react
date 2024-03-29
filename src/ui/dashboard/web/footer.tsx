import React, { useState, useEffect } from "react";
import Head from 'next/head';
import Image from 'next/image';
import { LiveStreamController } from "../../../controller/admin/livestream.controller";
import { LiveStreamDTO } from "../../../dto/LiveStream.dto";


export default function HomePageFooter() {
const _tmp: LiveStreamDTO[] = [];
const [items, setItems] = useState(_tmp);
    
    useEffect(() => {
        controller.list(setItems);
    }, []);


    const controller: LiveStreamController = new LiveStreamController();
  return (
    <footer className="footer_container">
            <div className="footer_col col_address">
                <div className="footer_header logo_text">
                    <div className="footer_logo"><img src="/images/KWLClogo.svg" alt="KWLC Logo"/></div>
                    <h5 className="section_subtitle">Kingdom Ways Living Church</h5>
                </div>
                <div className="contact_info">
                    <div className="contact_row">
                        <label className="label_icon"><i className="fa fa-phone" aria-hidden="true"></i></label>
                        <p className="contact_text">+ 234 70 433 2832</p> 
                    </div>
                
                    <div className="contact_row">
                        <label className="label_icon"><i className="fa fa-map-marker" aria-hidden="true"></i> </label>
                        <p className="contact_text">24 Prince Ibrahim Eletu Avenue, Shoprite Circle Mall Road Jakande Bus Stop, Osapa London,Lagos</p>
                    </div>
                
                    <div className="contact_row">
                        <label className="label_icon"><i className="fa fa-envelope" aria-hidden="true"></i></label>
                        <p className="contact_text">info@kwlchq.org</p>
                    </div>
                </div>
            </div>

            <div className="footer_col">
                <div className="footer_header">
                    <h4 className="section_title">Contact Us</h4>
                </div>
                <div className="contact_info">
                <form action="">
                    <input type="text" placeholder="Name" id="" className="footerInput"/>
                    <input type="email" placeholder="Email" id="" className="footerInput"/>
                    <textarea placeholder="Message" id="" cols={30} rows={10} className="footerInput"></textarea>
                </form>
                <button className="button">Send</button>
                </div>
            </div>

            <div className="footer_col">
                <div className="footer_header">
                    <h4 className="section_title">Up coming Events</h4>
                </div>

                 {    
                     items.length > 0 ? items.slice(0, 3).map((x, index) => {
                             return (
                                 <div className="contact_col" key={index}>
                                     <h4>{x.title}</h4>
                                     <span className="contact_span">July 7 @ 8:00 am - 10:30 am</span>
                                 </div>
                                 );                             
                        }) : undefined
                }
            </div>

            <div className="footer_col">
                <div className="footer_header">
                    <h4 className="section_title">Follow Us</h4>
                </div>
                <div className="contact_info txt_icons">
                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
            </div>
            
        </footer>
  )
}

import Layout from "../layout";
import NavBar from "../navbar";
import EventFinder from "./eventFinder";
import Head from 'next/head'
import EventList from "./list";
import { SingleEventItem } from "../../../../components/event-item";
import HomePageFooter from "../footer";
import { fakeModel } from "../../../../utils";
import PaymentBanner from "./Banner";
import PaymentContent from "./Content";

export default function Payments() {
    
    return (
        <>
            <Layout 
                externalStyles={["/styles/css/donation.css"]}
                navbar={"web"}
                title={"Tithe Payment"}
                withFooter={true}
            >
                <div className="payment">
                    <PaymentBanner />
                    <PaymentContent />
                    
                </div>
            </Layout>
        </>
    );
}
import react, {useState} from 'react';
import { Link} from "react-router-dom";
import './index.css';
import { Row, Col} from 'antd';
import Fade from 'react-reveal/Fade';
import { BsArrowUpCircle, BsArrowDownCircle } from "react-icons/bs";
import FQAsElement from '../FQAsElement';
const FQAs = [
    {title : "I have logged in, but all the numbers are blank.", content : "Make sure you are logged into the TronLink Pro Chrome extension. See step above on how to login. Refresh your browser once logged in. Make sure you have selected the wallet that you joined MetaTron with, in case you have multiples. "},
    {title : "How to access the website via my mobile", content : "To login in via your mobile, you have to use the TronLink Pro mobile app. Download the app via Google Play Store or the Apple App Store. Once logged in, click on DApps and enter the URL www.metatron.biz Your wallet will now be linked to your account, and you will be able to login successfully."},
    {title : "What is a Smart Contract?", content : "Meta Tron is based on a smart contract which is available on the Tron Blockchain. A smart contract is basically a protocol or program that has been put into the blockchain whereby no one, including the designers or developers can change the rules and all transaction are transparent and you have full visibility. There are no mediators or intermediaries and no human interaction, which is effectively guaranteeing the fairness of all people participating their funds according to the rules of the Smart Contract. We believe it is the most reasonable, safest, and best cutting-edge financial support model available at this time. To connect with the Smart Contract all you need to do is login to your TronLink wallet"},
    {title : "Can anyone join MetaTron?", content : "Yes, anyone can join MetaTron who is over the age of 18"},
    {title : "How secure are my funds?", content : "Our website has several degrees of protection. The servers are protected from DDoS attacks, and all the data is transferred by a protected channel that is provided with SSL certification. The platform is based on a Smart Contract meaning the rules are set and cannot be changed or manipulated."},
    {title : "How can I invest with MetaTron?", content : "To make an investment you must first become a member of MetaTron. Once you are signed up, you can make your first deposit. All deposits must be made through the Members Area and via your Tron Link wallet. You can login using the member username and password you receive when you signup."},
    {title : "Can I use any wallet to deposit?", content : "No, you must use Tron Link which is the recommended wallet by the Tron Foundation. "},
    {title : "What payment methods are accepted?", content : "MetaTron is a Smart Contract on the Tron TC20 blockchain. Therefore, we only accept Tron (TRX) and USDT (TRC20)"},
    {title : "Why are you on the Tron blockchain?", content : "The reason is simple. It has fast transaction speeds and very low fees. This makes it the most beneficial to our members hence why we only accept TRX and USDT"},
    {title : "What are the maximum and minimum limits for deposits?", content : "The minimum you can deposit is $20. There are no limits to the maximum you can deposit."},
    {title : "Are there any withdrawal limits?", content : "There are no withdrawal limits. If you deposit in TRX, you can only withdraw in TRX. If you deposit in USDT, you can only withdraw in USDT."},
    {title : "How quickly will I receive my withdrawals?", content : "All withdrawals are instant and without human influence"},
    {title : "Are there any withdrawal fees?", content : "Yes, the company takes a 5% deduction on all fees. The 5% is reinvested evenly on marketing, a charity fund to give to good causes and a 1% global pool which gets redistributed to everyone each month."},
    {title : "How do you generate the profits?", content : "We have a real team of crypto enthusiasts who work 24/7 to ensure all members get a return on their deposits every day"},
    {title : "I have made a deposit, when will my dashboard update", content : "All updates are instantly made. If the data is not showing, ensure your Tron Link wallet is connected and refresh your browser."},
    {title : "When do I receive my first profit?", content : "You will receive profits exactly 24 hours after you made your initial deposit. You are then free to withdraw these funds to your Tron Link wallet."},
    {title : "Can I sign up with more than one account?", content : "You can have several accounts, but these should not be registered via your referral link and please do not use the same IP. If you breach this, your wallet will be blocked, and your deposit will not be refunded. As soon as a deposit is made on one account, both accounts are automatically blocked. We will immediately punish all members who violate our rules."},
    {title : "How does Reinvest feature work?", content : "The initial aim of MetaTron is for you to make your initial deposit back as soon as possible. As soon as you have received your initial deposit back, 50% of future profits will be automatically reinvested on your behalf to enable compounding on your account. The other 50% you can withdraw to your Tron Link Wallet. In the long run you will earn more, and this makes the platform more sustainable."},
    {title : "Do I have to keep investing to earn?", content : "No, you only need to deposit once and that is it. Deposit Once Earn Meta Tron Forever"},
    {title : "What is Insurance Lock?", content : "Should there be a period where the market is not favourable and there are not enough funds in the community fund to pay all members, the Insurance Lock feature ensures that the platform is fair to all members. It ensures that the platform can continue to operate, and we don’t go offline. When the Insurance Lock is enabled, members who have already received 100% of their initial principal deposit will not receive any profit or be able to withdraw any funds. Those members that have received less than 100% are still able to withdraw as normal. Once the market conditions improve, the Insurance Lock will be disabled meaning all users can receive their profits and withdraw again. This means that it does not matter when you join the platform to benefit. Even new members can be rest assured that they will receive their initial deposit back."},
    {title : "How long will the platform last?", content : "The aim is for the platform to last a minimum of 5 years."},
]
function FQAsView() {

    const [confuseFAQ1, setFAQ1] = useState(false);
    const [confuseFAQ2, setFAQ2] = useState(false);

   
    return (
        
        <Row className='min-h-screen'>
            <Col span={24}>
                <Row>
                    <Col span={24} className='text-center mt-16 bg-yellow-300 p-4'>
                        <p className='text-2xl md:text-3xl'>FAQ's</p>
                    </Col>

                    <Col span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                        <Row className='mb-4 cursor-pointer flex justify-between items-center'onClick = {()=>setFAQ1(!confuseFAQ1)}>
                            
                            <Col span={21}>
                                <a className='text-base md:text-xl text-yellow-200 hover:text-yellow-100 my-4 '>How To Join?</a>
                            </Col>
                            <Col span={2} offset={1} className='text-right'>
                                {
                                    confuseFAQ1 ?
                                        <BsArrowUpCircle  size = {30} className='inline text-yellow-200'/>
                                    : 
                                        <BsArrowDownCircle  size = {30} className='inline text-yellow-200'/>
                                }
                            </Col>
                            
                            
                        </Row>
                        
                        {
                            confuseFAQ1 &&
                            <Fade >
                                The process to join MetaTron can be completed in 3 simple steps.<br/>
                                <Link to="/steps/0">Step 1: Create a TronLink Pro wallet</Link> <br/>
                                <Link to="/steps/1">Step 2: Fund your wallet with Tron</Link> <br/>
                                <Link to="/steps/2">Step 3: Sign up and register. Ensure you are logged in to your TronLink Pro Chrome extension</Link>
                            </Fade>
                        }
                    </Col>

                    <Col span={22} offset={1} className='bg-neutral-900 mt-8 text-white p-8'>
                        <Row className='mb-4 cursor-pointer flex justify-between items-center'onClick = {()=>setFAQ2(!confuseFAQ2)}>
                            
                            <Col span={21}>
                                <a className='text-base md:text-xl text-yellow-200 hover:text-yellow-100 my-4 '>I can’t log on</a>
                            </Col>
                            <Col span={2} offset={1} className='text-right'>
                                {
                                    confuseFAQ2 ?
                                        <BsArrowUpCircle  size = {30} className='inline text-yellow-200'/>
                                    : 
                                        <BsArrowDownCircle  size = {30} className='inline text-yellow-200'/>
                                }
                            </Col>
                            
                            
                        </Row>
                        
                        {
                            confuseFAQ2 &&
                            <Fade >
                                Make sure you are logged into the TronLink Pro Chrome extension. You need to log into this to log into MetaTron.<br/>
                                If you cannot see the TronLink Pro icon, click on the “Extensions” icon and pin the TronLink Pro application so that it always appears as a shortcut on your browser.<br/>
                                <img src='/assets/img/cantlogin.jpg'/>
                            </Fade>
                        }
                    </Col>


                    {
                        FQAs.map((item,idx)=>(
                            <FQAsElement key = {idx} title = {item.title} content = {item.content}/>
                        ))
                    }  
                </Row>
            
            </Col>
        </Row>
        
    
  );
}

export default FQAsView;

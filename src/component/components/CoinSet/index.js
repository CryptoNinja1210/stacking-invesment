import react from 'react';
import './index.css';
import { Row, Col, Button } from 'antd';

function CoinSet(props) {
  return (
    <Row>
        <Col span={24} className='mt-8'>
            <Row className='flex justify-center items-center'>
                <Col  className='mt-8 p-4 border-2 border-white bg-neutral-900 mx-6 rounded-lg'>
                    <p className='text-white text-lg font-bold'>TRON Price (TRX) </p>
                    <p className='text-white text-lg '>
                        {` $${Number(props.tron.price1).toFixed(5) || 0.07719} `}
                        {
                            Number(props.tron.high1) >=0 ?
                                <span className="p-1 text-sm bg-green-500 rounded-lg">{`+${props.tron.high1||2.99}%`}</span>
                            :
                                <span className="p-1 text-sm bg-red-500 rounded-lg">{`${props.tron.high1||2.99}%`}</span> 
                        }
                        
                    </p>
                    <p className='text-gray-400 text-xs mt-1'>
                        {`${props.tron.price2||0.000001659} BTC`}
                        {
                            Number(props.tron.high2) >=0 ?
                                <span className='text-green-300 ml-2'>{`${props.tron.high2||0.88}%`}</span>
                            :
                                <span className='text-red-300 ml-2'>{`${props.tron.high2||0.88}%`}</span>
                        }
                        
                    </p>
                    <p className='text-gray-400 text-xs mt-1'>
                        {`${props.tron.price3||0.00002055} ETH`}
                        {
                            Number(props.tron.high3) >= 0 ?
                                <span className='text-green-300 ml-2'>{`${props.tron.high3||0.78}%`}</span>
                            :
                                <span className='text-red-300 ml-2'>{`${props.tron.high3||0.78}%`}</span>
                        }
                        
                    </p>
                </Col>
                <Col  className='mt-8 p-4 border-2 border-white bg-neutral-900 mx-6 rounded-lg'>
                    <p className='text-white text-lg font-bold'>Tether Price (USDT) </p>
                    <p className='text-white text-lg '>
                        {` $${Number(props.usdt.price1).toFixed(5) || 0.07719} `}
                        {
                            Number(props.usdt.high1) >=0 ?
                                <span className="p-1 text-sm bg-green-500 rounded-lg">{`+${props.usdt.high1||2.99}%`}</span>
                            :
                                <span className="p-1 text-sm bg-red-500 rounded-lg">{`${props.usdt.high1||2.99}%`}</span> 
                        }
                        
                    </p>
                    <p className='text-gray-400 text-xs mt-1'>
                        {`${props.usdt.price2||0.000001659} BTC`}
                        {
                            Number(props.usdt.high2) >=0 ?
                                <span className='text-green-300 ml-2'>{`${props.usdt.high2||0.88}%`}</span>
                            :
                                <span className='text-red-300 ml-2'>{`${props.usdt.high2||0.88}%`}</span>
                        }
                        
                    </p>
                    <p className='text-gray-400 text-xs mt-1'>
                        {`${props.usdt.price3||0.00002055} ETH`}
                        {
                            Number(props.usdt.high3) >= 0 ?
                                <span className='text-green-300 ml-2'>{`${props.usdt.high3||0.78}%`}</span>
                            :
                                <span className='text-red-300 ml-2'>{`${props.usdt.high3||0.78}%`}</span>
                        }
                        
                    </p>
                </Col>
            </Row>
            
            
        </Col>
    </Row>
  );
}

export default CoinSet;

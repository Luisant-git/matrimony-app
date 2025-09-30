import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './style.css';  // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const SuccessFully = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsChecked(true), 500);  // Animate the checkmark after 0.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-page-container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={24} sm={16} md={12} lg={8}>
          <Card className="success-card">
            <div className="icon-container">
              {isChecked ? (
                <CheckCircleOutlined className="tick-icon animated" />
              ) : (
                <div className="loading-circle"></div>
              )}
            </div>
            <Title level={2} className="success-title">Success</Title>
            <Paragraph className="success-message">
              Your profile has been added. An admin will contact you soon to verify your account within 24 hours. Stay tuned.
            </Paragraph>
            <Paragraph className="success-message">
              உங்கள் பிரொஃபைல் சேர்க்கப்பட்டுள்ளது. நிர்வாகி 24 மணி நேரத்தில் உங்கள் கணக்கை சரிபார்க்க தொடர்பு கொள்ளுவார். காத்திருங்கள்.
            </Paragraph>
            <Link to='/'><button  block className="home-button w-100">
              Go to Home
            </button></Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SuccessFully;

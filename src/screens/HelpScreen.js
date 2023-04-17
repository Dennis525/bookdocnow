import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function HelpPage() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Help Page</h1>
          <p>Welcome to our help page. Here you'll find information on how to use our bookdocnow web application.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Frequently Asked Questions</h2>
          <p>Here are some of the most common questions we receive:</p>
          <ul>
            <li>How do I create an account?</li>
            <p><span>You create an account in this web application through signing up</span></p>
            <li>How do I book an appointment?</li>
            <p><span>You book an appointment by following the steps from clicking book to the last step which is making the payment</span></p>
            <li>How do I update my profile account?</li>
            <li>How do I make payments?</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Contact Us</h2>
          <p>If you can't find the answer to your question on this page, please feel free to contact us:</p>
          <ul>
            <li>Email: support@bookdocnow.com</li>
            <li>Phone:  (254) 700 120000</li>
            <li>Twitter: @bookdocnow</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default HelpPage;

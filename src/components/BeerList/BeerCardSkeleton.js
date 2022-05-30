import React from 'react';
import { Col, Card, CardBody, Row } from 'reactstrap';
import './BeerCardSkeleton.css';

export default class BeerCard extends React.Component{
  render() {
    
    /* Removing data-params from props */
    delete this.props.data;

    return (
        <Col {...this.props}>
          <Card className="mb-5 shadow beer-block beer-block-skeleton">
              <CardBody>
                <Row>
                    <Col xs="4">
                        <div className="beer-img skeleton"></div>
                    </Col>
                    <Col xs="8">
                        <div className="beer-name skeleton"></div>
                        <div className="beer-subtitle skeleton" ></div>
                        <div className="beer-desc skeleton"></div>
                    </Col>
                </Row>
              </CardBody>
          </Card>
        </Col>
    );
  }
}

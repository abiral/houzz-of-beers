import React from 'react';
import { Row, Col, Card, CardBody, Tooltip } from 'reactstrap';

export default class BeerCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isTooltipOpen: false,
        };
    }

    buildIngredients(ingredients){
        return `ingredients: ${Object.keys(ingredients).join(', ')}`;
    }

    render() {
        const {data} = this.props;
        const ingredients = this.buildIngredients(data.ingredients);
        const desc = data.description.substring(0, 85) + '...';
        
        return (
            <Col {...this.props}>
            <Card className="mb-5 shadow beer-block">
                <CardBody>
                    <Row>
                        <Col xs="4">
                            <img className="beer-img" id={`img-${this.props.imgid}`} src={data.image_url} alt={data.name} />
                        </Col>
                        <Col xs="8">
                            <h4 className="beer-name">{data.name}</h4>
                            <h5 className="beer-subtitle" >{data.tagline}</h5>
                            <p className="beer-desc">{desc}</p>
                        </Col>
                        <Tooltip
                        placement="right"
                        isOpen={this.state.isTooltipOpen}
                        target={`img-${this.props.imgid}`}
                        toggle={() => this.setState({ isTooltipOpen: !this.state.isTooltipOpen })}
                        autohide={true}
                        >{ingredients}</Tooltip>
                    </Row>
                </CardBody>
            </Card>
            </Col>
        );
    }
}

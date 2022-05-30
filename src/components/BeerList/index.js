import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import BeerCard from './BeerCard';
import BeerCardSkeleton from './BeerCardSkeleton';
import './index.css';
import api from '../../utils/api';
import {CancelToken} from '../../utils/api';
import {ReactComponent as ChevronCompactDown} from '../../assets/icons/chevron-compact-down.svg';

export default class BeerList extends React.Component{

    constructor(props){
        super(props);
        this._ismounted = true;
        this._cancelToken = null;
        this.state = {
            page: 1,
            per_page: 10,
            beers: [],
            isLoading: true,
            isEnded: false,
        }
    }

    componentWillUnmount(){
        this._ismounted = false;
        this._cancelToken.cancel();        
    }

    async componentDidMount(){
        this._cancelToken = CancelToken.source();
        await this.getData();
    }

    async getData () {
        this.setState({ isLoading: true });

        let {beers} = this.state;

        const endpoint = `/beers?page=${this.state.page}&per_page=${this.state.per_page}`;
        const response = await api.get(endpoint, { cancelToken: this._cancelToken.token });
        if (response.status === 200) {
            beers = beers.concat(response.data);
            this.setState({ beers, isLoading: false });
        } else {
            this.setState({ isEnded: true, isLoading: false });
        }
    }

    paginate = async (e) => {
        let {page} = this.state;
        page++;
        this.setState({ page });
        await this.getData();
    }

    renderSkeleton(){
        const totalSkeletons = this.state.beers.length ? this.state.beers.length : this.state.per_page;
        return (
            <Row>
                {[...Array(totalSkeletons)].map((e, i) => (
                    <BeerCardSkeleton
                        key={`beer-skeleton-${i}`} 
                        md="6"
                        sm="12"
                    />
                ))}
            </Row>
        );
    }

    render() {
        if (this.state.isLoading) {
            return this.renderSkeleton();
        }

        if(this.state.beers){
            return (
                <>
                    <h3 className="list-title">Beers</h3>
                    <div className="beer-lists">
                        <Row>
                            {this.state.beers.map((b, index) => {
                                return (
                                    <BeerCard
                                        imgid={`beer-${index}`}
                                        key={`beer-${index}`}
                                        data={b}
                                        className="beer-card"
                                        md="6"
                                        sm="12"
                                    />
                                );
                            })}
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button className="load-more" onClick={this.paginate}>
                                    Load More <ChevronCompactDown />
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </>
            );
        }
    }
}

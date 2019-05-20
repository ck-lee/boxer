const { Component, Fragment } = wp.element;
const { withSelect } = wp.data;
import { isUndefined, pickBy } from 'lodash'

class Boxes extends Component {

    constructor() {
		super( ...arguments );
		this.state = {
		};
	}

    render() {
        const {
            alignment,
            latestPosts,
        } = this.props;

        const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
 
        return (
            <Fragment>
                { 
                    hasPosts ? 
                    <div className="boxer">
                            {
                                latestPosts.map( ( post, i ) => {
                                    return (
                                        <div key={i} style={ { textAlign: alignment } }>
                                            <div>{post.title.raw}</div>
                                            <div>{post.date}</div>
                                            <div>{post.raw}</div>
                                        </div>
                                    );
                                })
                            }
                    </div>
                    :
                    <div>Boxer is useless without posts.</div> 
                }
            </Fragment>
        );
    }
}

export default withSelect( ( select, props ) => {
	const {
		displayNumber = 3
	} = props;
	const { getEntityRecords } = select( 'core' )
	const latestPostsQuery = pickBy( {
		categories: '',
		order: 'desc',
		orderby: 'date',
		per_page: displayNumber, // eslint-disable-line camelcase
	}, value => ! isUndefined( value ) )
	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
	}
} )( Boxes )

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
            backgroundColor,
            latestPosts,
        } = this.props;

        const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
 
        return (
            <Fragment>
                { 
                    hasPosts ? 
                    <ul className="boxer" style={ { textAlign: alignment, backgroundColor: backgroundColor } }>
                            {
                                latestPosts.map( ( post, i ) => {
                                    return (
                                        <li key={i} style={ { textAlign: alignment } }>
                                            <h5>{post.title.raw}</h5>
                                            <p>{ post.date }</p>
                                        </li>
                                    );
                                })
                            }
                    </ul>
                    :
                    <div>Boxer is useless without posts.</div> 
                }
            </Fragment>
        );
    }
}

export default withSelect( ( select, props ) => {
	const {
		displayNumber = 100
	} = props;
	const { getEntityRecords } = select( 'core' )
	const latestPostsQuery = pickBy( {
        context: 'view',
		order: 'desc',
		orderby: 'date',
        per_page: displayNumber, // eslint-disable-line camelcase
	}, value => ! isUndefined( value ) )
	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
	}
} )( Boxes )

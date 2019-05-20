import { Component, Fragment } from '@wordpress/element';
const { withSelect } = wp.data;
import { isUndefined, pickBy } from 'lodash'
import Boxes from './components/Boxes';

const { __ } = wp.i18n;

const {
	AlignmentToolbar,
    BlockControls,
    InspectorControls
} = wp.editor;

const {
    RangeControl
} = wp.components;

class Edit extends Component {

    constructor() {
		super( ...arguments );
		this.state = {
		};
	}

    render() {
        const {
            attributes: {
                alignment,
                displayNumber
            },
            className,
            latestPosts,
            setAttributes
        } = this.props;
 
        return (
            <Fragment>
                {
                    <InspectorControls>
                        <RangeControl
                            label={ __( 'Number of posts displayed' ) }
                            value={ displayNumber }
                            onChange={ displayNumber => setAttributes( { displayNumber } ) }
                            min={ 1 }
                            max={ 12 }
                        />
                    </InspectorControls>
                }
                {
                    <BlockControls>
                        <AlignmentToolbar
                            value={ alignment }
                            onChange={ alignment => setAttributes( { alignment } ) }
                        />
                    </BlockControls>
                }
                { 
                    <Boxes
                        alignment={alignment}
                        displayNumber={displayNumber}
                    ></Boxes>
                }
            </Fragment>
        );
    }
}

export default withSelect( ( select, props ) => {
	const {
		displayNumber = 3
	} = props.attributes
	const { getEntityRecords } = select( 'core' )
	const latestPostsQuery = pickBy( {
		categories: '',
		order: 'desc',
		orderby: 'date',
		per_page: displayNumber,
	}, value => ! isUndefined( value ) )
	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
	}
} )( Edit )

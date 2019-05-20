const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;


import edit from './edit';
import save from './save';

registerBlockType( 'boxer/boxer', {
	title: __( 'Boxer', 'boxer' ),
	icon: 'archive',
	category: 'layout',
	attributes: {
		alignment: {
			type: 'string',
			default: 'none'
        },
        displayNumber: {
            type: 'integer',
            default: 3
        }
    },
    keywords: [],
	supports: {},
	edit: edit,
	save: save
} );
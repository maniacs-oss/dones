/**
 * External dependencies
 */
import { createElement } from 'preact';
import { connect } from 'preact-redux';
import { map, groupBy } from 'lodash';

/**
 * Internal dependencies
 */
import QueryUsers from 'components/query-users';
import QueryDones from 'components/query-dones';
import { getSortedDones } from 'state/selectors';
import TagDonesDate from './date';

function TagDones( { query, dones } ) {
	// We need to preserve time accuracy within date to enable sorting, but for
	// purposes of displaying grouped by date, we split between date and time
	// parts, pulling date (e.g. "2017-01-01 00:00:00" => "2017-01-01")
	function byDate( done ) {
		return done.date.split( ' ' )[ 0 ];
	}

	return (
		<ul className="tag-dones">
			<QueryUsers />
			<QueryDones query={ query } />
			{ map( groupBy( dones, byDate ), ( dateDones, date ) => (
				<li key={ date }>
					<TagDonesDate
						date={ date }
						dones={ dateDones } />
				</li>
			) ) }
		</ul>
	);
}

export default connect( ( state, { query } ) => ( {
	dones: getSortedDones( state, query )
} ) )( TagDones );

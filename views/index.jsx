var React = require('react');
var DefaultLayout = require('./layouts/default');

class HelloMessage extends React.Component {
    render() {
        return (
            <DefaultLayout title="Sortable Table assignment">
                <div id="root">

                </div>
            </DefaultLayout>
        );
    }
}

module.exports = HelloMessage;

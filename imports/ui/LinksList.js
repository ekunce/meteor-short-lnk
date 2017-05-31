import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

class LinksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    }
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    })
  }

  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links found</p>
        </div>
      );
    }

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl}{...link}/>;
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
}

export default LinksList;

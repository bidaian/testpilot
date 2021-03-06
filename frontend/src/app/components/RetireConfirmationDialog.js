// @flow

import React from 'react';

type RetireConfirmationDialogProps = {
  uninstallAddon: Function,
  onDismiss: Function,
  sendToGA: Function,
  navigateTo?: Function
}

export default class RetireConfirmationDialog extends React.Component {
  props: RetireConfirmationDialogProps

  render() {
    return (
      <div className="modal-container">
        <div id="retire-dialog-modal" className="modal feedback-modal modal-bounce-in">
          <header className="modal-header-wrapper warning-modal">
            <h3 className="title modal-header" data-l10n-id="retireDialogTitle">Uninstall Test Pilot?</h3>
            <div className="modal-cancel" onClick={e => this.cancel(e)}/>
          </header>
          <form>

            <div className="modal-content">
              <p data-l10n-id="retireMessage" className="centered">As you wish. This will disable any active tests, uninstall the Test Pilot add-on, and remove your account information from our servers.</p>
              <p data-l10n-id="retireEmailMessage" className="centered small">To opt out of email updates, simply click the <em>unsubscribe</em> link on any Test Pilot email.</p>
            </div>
            <div className="modal-actions">
              <button onClick={e => this.proceed(e)} data-l10n-id="retireSubmitButton" className="submit button warning large">Proceed</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  proceed(e: Object) {
    const { sendToGA, navigateTo, uninstallAddon } = this.props;
    e.preventDefault();
    uninstallAddon();
    sendToGA('event', {
      eventCategory: 'HomePage Interactions',
      eventAction: 'button click',
      eventLabel: 'Retire'
    });
    if (typeof navigateTo !== 'undefined') {
      navigateTo('/retire');
    }
  }

  cancel(e: Object) {
    e.preventDefault();
    this.props.onDismiss();
  }
}

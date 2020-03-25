import BaseView from '../internals/BaseView';
import BaseForm from '../internals/BaseForm';
import Util from '../../../util/Util';

// for BETA,
// redirect is needed for Apple SSO Extension to intercept the request, because
// - XHR request is not interceptable
// - form post is interceptable, but some app (Outlook) closes the app after
// We may have a different approach/UX for EA
const Body = BaseForm.extend({
  noButtonBar: true,

  title: 'You are being redirected',

  initialize () {
    BaseForm.prototype.initialize.apply(this, arguments);

    // TODO: this should be handle by the foundation,
    // not on the view level
    const method = this.options.appState.get('__rawResponse').remediation.value
      .filter(v => v.name === this.options.appState.get('currentFormName'))[0].method || '';
    if (method.toLowerCase() === 'get') {
      Util.redirectWithFormGet(this.options.currentViewState.href);
    } else {
      this.add('<div class="spinner"></div>');
      this.options.appState.trigger('saveForm', this.model);
    }
  }
});

export default BaseView.extend({
  Body,
});

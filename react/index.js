import React, {Component} from 'react'
import {ExtensionPoint} from 'render'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl'

class GettingStartedIndex extends Component {
  render () {
    return (
      <article>
        <header className="bg-light-blue sans-serif">
          <div className="mw9 center pa5 pt4-ns pb4-ns ph7-1 grow">
            <h1 className="f2 f1-m f-headline-l lh-title mv0">
              <FormattedMessage id="getting-started.greeting"/>
            </h1>
            <h3 className="f3 fw1 georgia">
              <FormattedMessage id="getting-started.description"/>
            </h3>
            <h4 className="f6 ttu tracked black-80">
              @renderteam
            </h4>
          </div>
        </header>
        <div className="pa4 ph7-l georgia mw9 center">
          {__RUNTIME__.hints.mobile && <FormattedMessage id="getting-started.mobile"/>}
          <ExtensionPoint id="second-step">
          </ExtensionPoint>
          <ExtensionPoint id="first-step">
          </ExtensionPoint>
        </div>
        {this.props.children}
      </article>
    )
  }
}

export default GettingStartedIndex

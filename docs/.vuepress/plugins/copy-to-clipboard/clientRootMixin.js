import './clipboard.css'
import './tooltip.css'
import ClipboardJS from 'clipboard'

export default {
  mounted () {
    this.ensureCopyToClipboard()
  },

  updated () {
    this.ensureCopyToClipboard()
  },

  methods: {
    ensureCopyToClipboard () {
      var existing = document.querySelectorAll('pre[class*="language-"] > button.btn-copy-to-clipboard');
      if (existing.length > 0) {
        console.log('copy-to-clipboard already initialized.')
        return false;
      }
      console.log('copy-to-clipboard not initialized yet, continuing ...')

      const copyIcon =
        '<svg width="12" height="12" viewBox="340 364 14 15" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M342 375.974h4v.998h-4v-.998zm5-5.987h-5v.998h5v-.998zm2 2.994v-1.995l-3 2.993 3 2.994v-1.996h5v-1.995h-5zm-4.5-.997H342v.998h2.5v-.997zm-2.5 2.993h2.5v-.998H342v.998zm9 .998h1v1.996c-.016.28-.11.514-.297.702-.187.187-.422.28-.703.296h-10c-.547 0-1-.452-1-.998v-10.976c0-.546.453-.998 1-.998h3c0-1.107.89-1.996 2-1.996 1.11 0 2 .89 2 1.996h3c.547 0 1 .452 1 .998v4.99h-1v-2.995h-10v8.98h10v-1.996zm-9-7.983h8c0-.544-.453-.996-1-.996h-1c-.547 0-1-.453-1-.998 0-.546-.453-.998-1-.998-.547 0-1 .452-1 .998 0 .545-.453.998-1 .998h-1c-.547 0-1 .452-1 .997z" fill-rule="evenodd"/></svg>';
      const clearTooltip = function(e) {
          e.currentTarget.removeAttribute('tooltip');
          e.currentTarget.removeAttribute('tooltip-position');
        },
        showTooltip = function(elem, msg) {
          elem.setAttribute('tooltip', msg);
          elem.setAttribute('tooltip-position', 'left');
        },
        fallbackMessage = function(action) {
          var actionMsg = '';
          var actionKey = (action === 'cut' ? 'X' : 'C');
          if (/iPhone|iPad/i.test(navigator.userAgent)) {
              actionMsg = 'No support :(';
          } else if (/Mac/i.test(navigator.userAgent)) {
              actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
          } else {
              actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
          }
          return actionMsg;
        };
      var snippets = document.querySelectorAll('pre[class*="language-"] > code');
      snippets.forEach(function(snippet) {
        snippet.parentNode.firstChild.insertAdjacentHTML('beforebegin', '<button class="btn-copy-to-clipboard" title="Copy to clipboard" data-clipboard-snippet>'+copyIcon+'</button>')
      });
      var btns = document.querySelectorAll('.btn-copy-to-clipboard');
      for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener('mouseleave', clearTooltip);
          btns[i].addEventListener('blur', clearTooltip);
      }
      var clipboardSnippets = new ClipboardJS('[data-clipboard-snippet]', {
          target: function(trigger) {
              return trigger.parentNode.querySelector('code');
          }
      });
      clipboardSnippets.on('success', function(e) {
          e.clearSelection();
          showTooltip(e.trigger, 'Copied!');
      });
      clipboardSnippets.on('error', function(e) {
          showTooltip(e.trigger, fallbackMessage(e.action));
      });
    }
  }
}

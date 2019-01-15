/**
   * This is a list of rules from the stylelint-config-recommended repo that are different
   * to the rules that we have used in the parks and environment repo. We will adjust these
   * if they cause any issues but most of them should be welcome additions.
   */
  
  module.exports = {
    'extends': 'stylelint-config-recommended-scss',
    'rules': {
    // 'value-keyword-case': 'lower',
    // 'function-name-case': 'lower',
    'at-rule-empty-line-before': [ 'always', {
      except: [
        'blockless-after-same-name-blockless',
        'first-nested',
      ],
      ignore: ['after-comment'],
    } ],
    'at-rule-semicolon-newline-after': 'always',
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-space-before': 'always-single-line',
    'color-hex-length': 'short',
    'comment-empty-line-before': [ 'always', {
      except: ['first-nested'],
      ignore: ['stylelint-commands'],
    } ],
    'custom-property-empty-line-before': [ 'always', {
      except: [
        'after-custom-property',
        'first-nested',
      ],
      ignore: [
        'after-comment',
        'inside-single-line-block',
      ],
    } ],
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-colon-newline-after': 'always-multi-line',
    'declaration-empty-line-before': [ 'always', {
      except: [
        'after-declaration',
        'first-nested',
      ],
      ignore: [
        'after-comment',
        'inside-single-line-block',
      ],
    } ],
    'declaration-no-important': true,
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-whitespace-after': 'always',
    'indentation': 2,
    'max-empty-lines': 2,
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'rule-empty-line-before': [ 'always-multi-line', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    } ],
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-space-before': 'never',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-colon-notation': 'double',
    'value-list-comma-newline-after': 'always-multi-line'
  }
};

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'vue/max-attributes-per-line': [
      2,
      {
        'singleline': 5,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    'no-tabs': 0,
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'semi': [
      2,
      'never',
      {
        'beforeStatementContinuationChars': 'never'
      }
    ],
    'no-delete-var': 2,
    'prefer-const': [
      2,
      {
        'ignoreReadBeforeAssign': false
      }
    ],
    'template-curly-spacing': 'off',
    'indent': 'off',


    // 'no-console': 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'vue/attribute-hyphenation': 0,
    // 'vue/html-self-closing': 0,
    // 'vue/component-name-in-template-casing': 0,
    // 'vue/singleline-html-element-content-newline': 0,
    // 'vue/no-unused-components': 0,
    // 'vue/multiline-html-element-content-newline': 0,
    // 'vue/html-closing-bracket-newline': 0,
    // 'vue/no-parsing-error': 0,
    // 'no-tabs': 0,
    //  // 引号类型 `` "" ''
    // 'quotes': [
    //   2,
    //   'single',
    //   {
    //     'avoidEscape': true,
    //     'allowTemplateLiterals': true
    //   }
    // ],
    // // 关闭语句强制分号结尾
    // 'semi': [
    //   2,
    //   'never',
    //   {
    //     'beforeStatementContinuationChars': 'never'
    //   }
    // ],
    // 'no-delete-var': 2,
    // 'prefer-const': [
    //   2,
    //   {
    //     'ignoreReadBeforeAssign': false
    //   }
    // ],
    // 'template-curly-spacing': 'off',


    // // 'prettier/prettier': 2,
    'no-alert': 2, // 禁止使用alert confirm prompt
    'no-caller': 2, // 禁止使用arguments.caller或arguments.callee
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, // 函数参数不能重复
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-else-return': 2, // 如果if语句里面有return,后面不能跟else语句
    'no-invalid-regexp': 2, // 禁止无效的正则表达式
    'no-invalid-this': 2, // 禁止无效的this，只能用在构造器，类，对象字面量
    'no-irregular-whitespace': 2, // 不使用非法空白
    'no-multi-spaces': 2, // 不能用多余的空格
    'block-spacing': [0, 'never'], // 单行语句块的内侧要有空格
    'object-curly-spacing': 0, // 单行
    'new-cap': 0, // class命名第一字母大写
    'no-multiple-empty-lines': [2, {
      'max': 2
    }], // 空行最多不能超过2行
    'no-sequences': 2, // 禁止使用逗号运算符
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'no-trailing-spaces': 2, // 一行结束后面不要有空格
    'no-var': 2, // 禁用var，用let和const代替
    'array-bracket-spacing': [2, 'never'], // 是否允许非空数组里面有多余的空格
    'camelcase': 1, // 强制驼峰法命名
    'consistent-this': [2, 'this'], // this别名
    // 'default-case': 2, // switch语句最后必须有default
    'eol-last': 0, // 文件以单一的换行符结束
    'eqeqeq': 2, // 必须使用全等
    // 'generator-star-spacing': 2, // 生成器函数*的前后空格
    'no-unneeded-ternary': 2, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    // 'indent': [2, 2, {
    //   'SwitchCase': 1, // switch case 缩进
    //   'VariableDeclarator': 'first' // 变量声明
    // }], // 缩进风格
    'one-var': 0, // 连续声明
    'quote-props': [0, 'always'], // 对象字面量中的属性名是否强制双引号
    'no-unused-vars': 'off',
    // 'no-unused-vars': [2, {
    //   // 允许声明未使用变量
    //   'vars': 'local',
    //   // 参数不检查
    //   'args': 'none'
    // }],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }], // 逗号后面有一个空格
    'comma-dangle': [2, { // 无多余逗号
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'ignore'
    }],
    'space-in-parens': 2, // 函数参数列表括号内侧无空格
    'space-infix-ops': 2, // 中缀操作符（infix operators）前后要有一个空格
    'spaced-comment': [2, 'always', { // 注释符号后面要有空白
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }], // 一元运算符的前/后要不要加空格
    'space-before-function-paren': [2, 'always'], // 函数定义时括号前面要不要有空格 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always'
    // key值前面是否要有空格
    'key-spacing': [2, {
      'singleLine': {
        'beforeColon': false,
        'afterColon': true
      },
      'multiLine': {
        'beforeColon': false,
        'afterColon': true
        //         'align': 'colon'
      }
    }],
    'no-useless-return': 0,
    // 'no-mixed-operators': 0, // && 和 || 混合使用
    'no-new-func': 0, // 不允许字符串函数
    'no-mixed-spaces-and-tabs': 2, // 不允许tab
    'no-unreachable': 0, // 防止使用swtich语句 语法检查报错

    // /* vue */
    'vue/require-default-prop': 0,
    'vue/max-attributes-per-line': [2, { // 属性换行
      'singleline': 5, // 超过n个属性 换行
      'multiline': {
        'max': 1, // 当前属性位于多行状态时，每行的最大属性数
        'allowFirstLine': false // 允许在第1行 存在属性
      }
    }],
    'vue/html-indent': [2, 2, { // 第2个参数，标签缩进
      'attribute': 1, // 换行属性缩进量 n*单位(tabsize)
      'baseIndent': 1, // 根标签缩进量 n*单位(tabsize)
      'closeBracket': 0, // The multiplier of indentation for right brackets
      'alignAttributesVertically': false, // 属性是否应与多行中的第一个属性垂直对齐
      'ignores': []
    }],
    'vue/no-use-v-if-with-v-for': 0, // 不允许v-if v-for在一个标签属性里
    'vue/no-unused-vars': 0, // 不允许使用未定义的变量
    'vue/valid-v-on': [2, { // 不允许全用v-on
      'modifiers': []
    }],
    'vue/html-quotes': [2, 'double', { 'avoidEscape': false }], // 模板属性值必须使用双引号
    // 'vue/html-closing-bracket-spacing': 0, // 在标记的右括号>之前强制使用一致的间距样式
    'vue/html-closing-bracket-spacing': [0, { // 在标记的右括号>之前强制使用一致的间距样式
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always'
    }],
    'vue/mustache-interpolation-spacing': [2, 'always' | 'never'], // 模板双大括号中两端空白保持一致
    'vue/no-multi-spaces': [2, {
      'ignoreProperties': false
    }], // 不允许多个空格
    'vue/no-spaces-around-equal-signs-in-attribute': [2], // 不允许模板属性=等号左右留空格
    'vue/attributes-order': [2, {
      'order': [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS',
        'CONTENT'
      ],
      'alphabetical': false
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}

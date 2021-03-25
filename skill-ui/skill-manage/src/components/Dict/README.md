# DictSelectTag 组件用法
----
- 从字典表获取数据,dictCode格式说明: 字典code
```html
<dict-select-tag  v-model="queryParam.sex" placeholder="请输入用户性别"
                  dictCode="sex"/>
```

v-decorator用法：
```html
<dict-select-tag  v-decorator="['sex', {}]" :triggerChange="true" placeholder="请输入用户性别"
                  dictCode="sex"/>
```

- 从数据库表获取字典数据，dictCode格式说明: 表名,文本字段,取值字段
```html
<dict-select-tag v-model="queryParam.username" placeholder="请选择用户名称" 
                   dictCode="sys_user,realname,id"/>
```



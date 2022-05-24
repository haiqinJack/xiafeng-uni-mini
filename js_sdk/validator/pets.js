// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "avatarUrl": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "label": "宠物头像"
  },
  "nickname": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "宠物昵称"
  },
  "phone": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "联系方式"
  },
  "pet_group": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "宠物种类"
  },
  "pet_type": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "宠物品种"
  },
  "vaccines": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      }
    ],
    "label": "疫苗情况"
  },
  "pet_sex": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "公",
            "text": "公"
          },
          {
            "value": "母",
            "text": "母"
          }
        ]
      }
    ],
    "defaultValue": "公",
    "label": "性别"
  },
  "pet_weight": {
    "rules": [
      {
        "required": true
      },
      {
        "format": "double"
      }
    ],
    "label": "体重(kg)"
  },
  "isSterilization": {
    "rules": [
      {
        "format": "string"
      },
      {
        "range": [
          {
            "value": "是",
            "text": "是"
          },
          {
            "value": "否",
            "text": "否"
          }
        ]
      }
    ],
    "defaultValue": "否",
    "label": "是否绝育"
  },
  "birthday": {
    "rules": [
      {
        "format": "date"
      }
    ],
    "label": "出生年月"
  }
}

const enumConverter = {
  "pet_sex_valuetotext": {
    "公": "公",
    "母": "母"
  },
  "isSterilization_valuetotext": {
    "是": "是",
    "否": "否"
  }
}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("ProxyInfo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: '主键'
    },
    proxy_key: {
      type: DataTypes.STRING(50),
      comment: '生成的代理key，访问时用来判断应该代理什么url'
    },
    proxy_url: {
      type: DataTypes.STRING(500),
      comment: '代理url'
    },
    create_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '创建时间'
    },
    update_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '更新时间'
    }
  }, {
    tableName: 'proxy_info',
    createdAt: false,
    updatedAt: false,
    timestamps: true,
  })
}

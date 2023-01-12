module.exports = (sequelize, Sequelize) => {
    const OauthToken = sequelize.define(
        "oauth_token",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: Sequelize.STRING,
                unique: true // userId will be unique 
            },
            token: {
                type: Sequelize.STRING,
            },
            enable: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            }
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: "oauth_token"
        }
    );
    return OauthToken;
};

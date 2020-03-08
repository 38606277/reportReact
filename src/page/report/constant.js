module.exports = {
    BUSINESS_TYPE: {
        'FINANCE': 'financial', // 业务类型_财务部
        'OPENTICKET': 'openTicket', // 业务类型_财务部_财务开票
        'FUNDSDAILY': 'fundsDaily', // 业务类型_财务部_资金日报
        'PAYMENT_QUERY': 'paymentQuery', // 到款_财务部_查询表
        'CONTRACT_PAYMENT': 'receiveCollect',
        'PRODUCE': 'produce', // 业务类型_生产部
        'STOCK': 'stock', // 业务类型_生产部_存货
        'PRODUCTIONCHILDRENDAY': 'SUBCOMPANY_PRODUCE_DAILY', // 业务类型_生产部_子公司项目生产日报
        'PROJECT': 'project', // 业务类型_项目部
        'PROJECTCOMEOUT': 'projectComeOut', // 业务类型__项目部_项目中的收入确认
        'HUIKUAN': 'projectComeReceived', // 业务类型_项目部_项目中的回款
        'PROJECTRECEIVED': 'projectReceived', // 业务类型_项目部_到期应收
        'ProjectCHILDRENDAY':'received', // 业务类型_项目部_执行与回款
        'MARKET': 'market', // 业务类型_市场部
        'INTERNATIONAL': 'international', // 业务类型_国际业务部
        'PURCHASE': 'purchase', // 业务类型_供应链管理部
        'SIDA': 'sida', // 业务类型_思达公司
        'PLANNING': 'plan', // 业务类型_计划经营部
        'SUPERVISE': 'supervise', // 督办事项模板
    },
    SUPERVISE_LEVEL_OPTIONS: [
        {text: '*', value: '*'},
        {text: '**', value: '**'},
        {text: '***', value: '***'},
        {text: '****', value: '****'},
        {text: '*****', value: '*****'},
    ],
    SUPERVISE_STATUS_OPTIONS: [
        {text: 0.25, value: 0.25},
        {text: 0.50, value: 0.50},
        {text: 0.75, value: 0.75},
        {text: '完成', value: '完成'},
        {text: '未完成', value: '未完成'},
        {text: '持续性工作', value: '持续性工作'},
    ],
    SUPERVISE_ROUTER: {
        'FINANCE_SUPERVISE': 'financialSupervise', // 业务类型_财务部_督办事项
        'PRODUCE_SUPERVISE': 'produceSupervise', // 业务类型_生产部_督办事项
        'PROJECT_SUPERVISE': 'projectSupervise', // 业务类型_项目部_督办事项
        'MARKET_SUPERVISE': 'marketSupervise', // 业务类型_市场部_督办事项
        'INTERNATIONAL_SUPERVISE': 'internationalSupervise', // 业务类型_国际业务部_督办事项
        'PURCHASE_SUPERVISE': 'purchaseSupervise', // 业务类型_供应链管理部_督办事项
        'SIDA_SUPERVISE': 'sidaSupervise', // 业务类型_思达公司_督办事项
        'PLANNING_SUPERVISE': 'planSupervise', // 业务类型_计划经营部_督办事项
        'OFFICE_SUPERVISE': 'officeSupervise', // 业务类型_办公室_督办事项
        'OFFICE_KONGSECRETARY_SUPERVISE': 'officeKongSecretarySupervise', // 业务类型_办公室_孔书记_督办事项
        'OFFICE_LIMANAGE_SUPERVISE': 'officeLiManageSupervise', // 业务类型_办公室_李总_督办事项
        'OFFICE_FENGMANAGE_SUPERVISE': 'officeFengManageSupervise', // 业务类型_办公室_冯总_督办事项
        'OFFICE_MAZONGHUIMANAGE_SUPERVISE': 'officeMaZongHuiManageSupervise', // 业务类型_办公室_马总会_督办事项
        'OFFICE_MAOMANAGE_SUPERVISE': 'officeMaoManageSupervise', // 业务类型_办公室_毛总_督办事项
        'OFFICE_YUANMANAGE_SUPERVISE': 'officeYuanManageSupervise', // 业务类型_办公室_袁总_督办事项
        'OFFICE_ZHANGSECRETARY_SUPERVISE': 'officeZhangSecretarySupervise', // 业务类型_办公室_张书记_督办事项
        'OFFICE_TOTAL_SUPERVISE': 'officeTotalSupervise', // 业务类型_办公室_汇总_督办事项
        'HR_SUPERVISE': 'hrSupervise', // 业务类型_人力资源部_督办事项
        'TECHNOLOGY_MANAGE_SUPERVISE': 'technologyManageSupervise', // 业务类型_技术管理部_督办事项
        'PARTY_MASSES_SUPERVISE': 'partyMassesSupervise', // 业务类型_党群工作部_督办事项
        'DISCIPLINE_SUPERVISE': 'disciplineSupervise', // 业务类型_纪检监察部_督办事项
        'LAW_SUPERVISE': 'lawSupervise', // 业务类型_法律与审计部_督办事项
        'REFORM_SUPERVISE': 'reformSupervise', // 业务类型_改革办公室_督办事项
        'TECHNOLOGY_CENTER_SUPERVISE': 'technologyCenterSupervise', // 业务类型_技术中心_督办事项
        'SAFE_SUPERVISE': 'safeSupervise', // 业务类型_安全监察部_督办事项
        'WISDOM_SUPERVISE': 'wisdomSupervise', // 业务类型_智慧企业建设办公室_督办事项
        'QUALITY_SUPERVISE': 'qualitySupervise', // 业务类型_质量部_督办事项
        'CHILDREN_SUPERVISE': 'childrenSupervise', // 业务类型_子公司_督办事项
    },
    REPORT_STATUS: {
        'SAVE': 'save',
        'RELEASED': 'released',
    },
    URLLIST : [
        {
            old: 'market',
            new: 'marketing-detail',
        },
        {
            old: 'projectComeOut',
            new: 'projectCome-detail',
        },
        {
            old: 'projectComeReceived',
            new: 'projectOut-detail',
        },
        {
            old: 'projectReceived',
            new: 'projectReceivable-detail',
        },
        {
            old: 'project',
            new: 'projectDeliver-detail',
        },
        {
            old: 'stock',
            new: 'stock-detail',
        },
        {
            old: 'produce',
            new: 'production-detail',
        },
        {
            old: 'financial',
            new: 'finance-detail',
        },
        {
            old: 'plan',
            new: 'planning-detail',
        },
        {
            old: 'international',
            new: 'international-detail',
        },
    ],
    HEADER_COLOR:'#CCFFCC',
    NUMBER_TO_LETTER: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    LICENSEKEY:'172.16.3.48,365738736984978#B0tFrJFkeSRESahTYFVHM5pnVnRUMIZja9I4UwllUilkW0tWOyhXMjlTTKZTZCNHV7Y5T8pnN9E7c6kGaWZTexpmWnxWeKFXdPNncyYkZkJHa5MTO8I6Yw2EZSN4MHBzLzcncONleYJFZKB7bFNTbap5czRFcTBnNyElW6l5Z9Fnbyt6UxQlM7NlZJFmUYpUasVzYjB5Mp5WVPpnSkVWRxpWaPJEcuJ5UCVWMVJ7RwoEduV7Rp3UM6U4YwFUWNJlSLV7dzRGa6NEWwNDMulHUpZGMDdGaLN4VFhVVRtUMuVnZtVDenF6dpV6NNNWYvsierwmMMRmQiojITJCLicTQFJDM7MjMiojIIJCL6UDM9cTM4ATM0IicfJye&Qf35VfikkR9IkI0IyQiwiIyEjL6ByUKBCZhVmcwNlI0IiTis7W0ICZyBlIsIyNwADM9ADI7IjMwkTMwIjI0ICdyNkIsICO48yMuYTMuIzNxIiOiMXbEJCLig1jlzahlDZmpnInmDoimH9pnvpiljqiljqolTJrnzqukfJjlLiOiEmTDJCLigzN9QDO9YzM7gzM7UjNzIiOiQWSiwSflNHbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TPnZUR0ZmcVpVOzd4Vvh5asR7RORVYL96SZNGNCV4d7g6Nn5WaUlUe4tEdWxEdElDV6AFc88kWqhTMVhEZURjdzU7LvoXYxR6bCZkUx2GTlR6ViNTMPtSVuRUalJVasvWzJ',
    DEVELOPKEY: 'Designer-352575322796182#B0qWJ36TR3UYvgFZSBXMGNUUlVEOPdmTOpnYzIjY9dVeZFHeT9EUOp6ZE3GVQ3EcExUY6lEV75mYyk5d4ckZaplUhpGVtRDWTFVc7J7ZIJVOuFjMzVkbaJWOldnRiR4QOJUWBhDOrdnUJVncLdHNNNTMWhzdNlVY6EHV54WeQZUbtdXVZNUevVzQGhjciN5UJpmawlDTNt6S4M4Uzp5M5EnazVHe6h5LvVTUY5kR8dHUvIEM7dEMBtkV4pFS8YmTCt4M884NrIFTrtWTMllTrUDaDVnaVdnZwkGUtdDRXRHdXljNrBlUUNnVGlWd5JlS4NGW7kUQLJ7ViojITJCLiQUN4QTQEVENiojIIJCL5IzN6EDM8IDO0IicfJye#4Xfd5nIJZUOCJiOiMkIsIiMx8idgMlSgQWYlJHcTJiOi8kI1tlOiQmcQJCLiQzMxATOwAyNyIDM9EDMyIiOiQncDJCLiAjLw8CMuAzLyVmbnl6clRmI0IyctRkIsICuPWOrFWOkZmeicaOgKaekne+mKWOqKWOqiWOlseOr0S+lMWuI0ISYONkIsIiM8EjN9cjMyMTN7UjM5MjI0ICZJJCL3VWdyRnOiI7ckJye0ICbuFkI1pjIEJCLi4TP7ZXajlmSHV5c0lVduhndYdzdC3yLMZTbO9WOzAXbaljTrVWQ8BjajpEOxN6Y88UbmhFUmZVUpVkeXd7NYNTNy4GOalWQFRHalhVOHhHaKZVaJBVZjZDSYd6SjprU6h',
}

define(function (require, exports) {
  var Table = require('components/Table');
  var _ = require('core/lodash');
  var api = require('config/api');

  console.log(api.getUserInterface());

  var tableOptions = {
    columns: [
      { field: 'itemId', title: '商品分类id' },
      { field: 'merchantId', title: '商户id' },
      { field: 'productId', title: '商品id' },
      { field: 'status', title: '状态' },
      { field: 'productName', title: '商品名称' },
      { field: 'name', title: '商品分类名称' },
      { field: 'createTime', title: '商品创建时间' },
    ],

    trackBy: 'itemId',
    hasCheckbox: true,
    detailType: 'table',

    actions: [
      { title: '修改', action: 'modify' }
    ],

    batchActions: [
      { title: '修改', action: 'batchmodify', type: 'blue' },
      { title: '删除', action: 'batchdelete', type: 'red' }
    ],

    detailFields: [
      { field: 'detailField1', title: 'detailField1', column: 0 },
      { field: 'detailField2', title: 'detailField2', column: 0 },
      { field: 'detailField3', title: 'detailField2', column: 0 },
      { field: 'detailField4', title: 'detailField2', column: 0 },
    ]
  };

  var data = [
    { itemId: 1, merchantId: 80, productId: 100, status: 'OFFSALE', productName: 'product', name: 'name', createTime: '2016' },
    { itemId: 2, merchantId: 80, productId: 100, status: 'OFFSALE', productName: 'product', name: 'name', createTime: '2016' },
    { itemId: 3, merchantId: 80, productId: 100, status: 'OFFSALE', productName: 'product', name: 'name', createTime: '2016' },
    { itemId: 4, merchantId: 80, productId: 100, status: 'OFFSALE', productName: 'product', name: 'name', createTime: '2016' }
  ];

  var data2 = [
    { itemId: 2, merchantId: 90, productId: 110, status: 'ONSALE', productName: 'product2', name: 'name2', createTime: '2016' }
  ];

  var detailData = {
    detailField1: 1, detailField2: 2
  };

  var detailTableData = [
    { detailField1: 1, detailField2: 2, detailField3: 3, detailField4: 4 },
    { detailField1: 1, detailField2: 2, detailField3: 3, detailField4: 4 },
    { detailField1: 1, detailField2: 2, detailField3: 3, detailField4: 4 },
    { detailField1: 1, detailField2: 2, detailField3: 3, detailField4: 4 }
  ];

  exports.init = function () {
    console.log('table init');
    console.log(api.getUserInterface());
    
    var $container = $('.content.panel');

    var table = new Table(
      tableOptions,
      data
    );

    var p = table
      .on('modify', function (e) {
        console.log('rowData', e.data);
        var id = e.data[tableOptions.trackBy];

        var data = {};
        data[tableOptions.trackBy] = id;

        // table.updateRow(_.assign(data2[0], data));
        table.removeRow(id);
      })
      .on('getdetail', function (e) {
        console.log('getdetail', e.data);
        var id = e.data[tableOptions.trackBy];

        var data = {};
        data[tableOptions.trackBy] = id;

        table.updateDetail(_.assign({ data: detailTableData }, data));
      })
      .on('batchmodify', function (e) {
        console.log('batchmodify', e.data);
      });

    table.mount($container);
  };
});

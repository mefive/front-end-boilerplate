import 'styles/showcase.scss';

import 'common/ui';
import Ractive from 'ractive';
import tsml from 'tsml';

import Select from 'components/Select';
import Chart from 'components/Chart';
import RadioGroup from 'components/RadioGroup';
import DatePicker from 'components/DatePicker';
import Wizzard from 'components/Wizzard';
import Form from 'components/Form';
import Markdown from 'components/Markdown';
import Table from 'components/Table';
import Scrollable from 'components/Scrollable';
import ImageUploader from 'components/ImageUploader';
import ImagesUploader from 'components/ImagesUploader';
import DateRangeSelect from 'components/DateRangeSelect';
import Popover from 'components/Popover';
import FileUploader from 'components/FileUploader';
import Modal from 'components/Modal';
import Tooltip from 'components/Tooltip';

import random from 'lodash/random';

function genSelect($container, label, data, multiple = false) {
  var $formControl = $(''
    + '<div class="form-group">'
    +   '<label>' + label + '：</label>'
    + '</div>'
  ).appendTo($container);

  return new Select({
    el: $formControl,
    data: {
      options: data,
      value: multiple ? [] : '1',
      width: 200,
      multiple
    }
  });
}

var platformSelect = [
    { value: '1', title: 'iOS' },
    { value: '2', title: 'Android' },
    { value: '3', title: 'WP' },
    { value: '4', title: 'iOS1' },
    { value: '5', title: 'Android1' },
    { value: '6', title: 'WP1' }
];

var channelSelect = [
  { value: '1', title: '全渠道' },
  { value: '2', title: '渠道1' },
  { value: '3', title: '渠道2' }
];

function init() {
    var $selectContainer = $('#select .items');

    var select1 = genSelect($selectContainer, '平台', platformSelect);

    var select2 = genSelect($selectContainer, '渠道', channelSelect);

    select2
      .on('change:value', c => { console.log(c); });

    var select3
      = genSelect(
        $selectContainer,
        '多选',
        [
          { value: '1', title: '1' },
          { value: '2', title: '2' },
          { value: '3', title: '3' },
          { value: '4', title: '4' },
          { value: '5', title: '5' }
        ],
        true
      );

    var tabs = new RadioGroup({
      el: '#button-group .items',
      data: {
        options: [
          { value: 1, title: '活跃用户' },
          { value: 2, title: '新增用户' },
          { value: 3, title: '启动次数' }
        ],
        value: 1
      }
    });

    var underlineTabs = new RadioGroup({
      el: '#button-group .items',
      data: {
        options: [
          { value: 'HOUR', title: '时' },
          { value: 'DAY', title: '日' },
          { value: 'WEEK', title: '周' },
          { value: 'MONTH', title: '月' }
        ],
        value: 'HOUR',
        type: 'underline'
      }
    });

    tabs
      .on('change:value', v => console.log(v));

     // const chart = new Chart({
     //  el: '#highcharts .items',
     //  data: {
     //    title: 'mefive'
     //  }
     // });

     // chart.set('series', [
     //    { name: '普通用户', data: [1, 2, 3] },
     //    { name: '游客', data: [4, 7, 6] },
     //    { name: 'VIP', data: [2, 4, 6] },
     //    { name: '白金', data: [4, 8, 6] }
     //  ]);

    var datePicker = new DatePicker({
      el: '#date-picker .item',
      data: {
        max: '2016-10-10'
      }
    });

    datePicker
      .on('change:value', d => console.log(d));

    const steps = [
      {
        name: 'first',
        template: `<div>first</div>`,
        title: 'first',
        validate: true
      },
      {
        name: 'second',
        template: `<div>second</div>`,
        title: 'second'
      }
    ];

    var wizzard = new Wizzard({
      el: '#wizzard .items',
      data: {
        steps
      },
      partials: steps
        .reduce((prev, current) => {
          prev[current.name] = current.template;
          return prev;
        }, {})
    });

    wizzard
      .on('next', step => {
          wizzard.next();
      });

    wizzard
      .on('prev', step => {
        wizzard.prev();
      });

    var form1 = new Form({
      el: '#form .items',
      data: {
        validateOnBlur: true,
        labelWidth: 130,
        fields: [
          { name: 'desc', type: 'textarea', label: '应用简介', maxLength: 3, value: 'some brife desc', required: true },
          { name: 'password', type: 'password', label: '密码', required: true },
          { name: 'shotscreen', type: 'fileUploader', label: '截图', required: false },
          { name: 'start_date', type: 'date', label: '开始日期', required: false },
          { name: 'text', type: 'text', label: '测试正则', regex: /.com$/ }
        ]
      }
    });

    // const markdown = new Markdown({
    //   el: '#markdown .items',
    //   data: {
    //     raw: '###Header'
    //   }
    // });

  const table = new Table({
    el: '#table .items',
    data: {
      columns: [
        { field: 'id', title: 'Id' },
        { field: 'name', title: '姓名' },
        { field: 'age', title: '年龄' },
        { field: 'gender', title: '性别' },
        { field: 'avatar', title: '头像' }
      ],
      preColumns: [
        { field: 'basicInfo', title: '基础信息', colspan: 2 },
        { field: 'personal', title: '个性化', colspan: 5 }
      ],
      rows: (function () {
        const rt = [];
        const possible
          = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 90; i++) {
          rt.push({
            id: i + 1,
            name: (function () {
              let text = '';
              for (let j = 0; j < 5; j++) {
                text += possible.charAt(random(0, 61));
              }
              return text;
            })(),
            age: random(20, 40),
            avatar: 'http://j01.ci.zw.ted:8888/static/87671949/images/headshot.png',
            gender: ['male', 'female'][random(0, 1)],
            detail: {
              company: (function () {
                let text = '';
                for (let j = 0; j < 20; j++) {
                  text += possible.charAt(random(0, 61));
                }
                return text;
              })(),
              department: (function () {
                let text = '';
                for (let j = 0; j < 20; j++) {
                  text += possible.charAt(random(0, 61));
                }
                return text;
              })(),
            }
          })
        }

        return rt;
      })(),
      actions: [{ type: 'primary', title: '修改', action: 'modify' }],
      hasCheckbox: false,
      height: 400,
      batchActions: [
        { action: 'submit', title: '提交', type: 'primary' }
      ],
      detailColumns: [
        { field: 'company', title: 'Company' },
        { field: 'department', title: 'Department' }
      ],
      customRow: true,
      customNoData: true
    },
    partials: {
      row: tsml`
        <td {{#column.align}} style="text-align:{{column.align}}"{{/}}>
          {{row[column.field]}}
        </td>
      `,
      noData: tsml`
        <div style="line-height:400px">
          自定义没有数据的展示
        </div>
      `
    },
    clickAvatar(id) {
      alert(JSON.stringify(this.get('rows').find(i => i.id === id)));
    }
  });

  table
    .on('submit', () => {
      console.log('submit');
      table
        .set('rows[0].name', 'mefive');
    });

  table
    .on('modify', (row) => alert(`修改<br />${JSON.stringify(row)}`));

  table
    .on('next_page', () => {
      console.log('next page');
    });

  const scrollable = new Ractive({
    el: '#scrollable .items',
    template: tsml`
      <Scrollable>
        <div class="scrollable-content">
          <div>
            Scrollable Content
          </div>
        </div>
      </Scrollable>
    `,
    components: { Scrollable },
    data: {
      height: 400
    }
  });

  // const imageUploader = new ImageUploader({
  //   el: '#image-uploader .items',
  //   data: {
  //     uploadUrl: 'http://10.129.204.146:1986/upload/images',
  //     crossDomain: true
  //   }
  // });

  const imagesUploader = new ImagesUploader({
    el: '#image-uploader .items',
    data: {
      uploadUrl: 'http://10.129.204.146:1986/upload/images',
      crossDomain: true,
      height: 125,
      width: 67,
      images: [
        { url: 'http://img04.sogoucdn.com/v2/thumb/resize/w/100/h/100/t/0/?appid=100140008&name=4a31db75-21b6-411c-a830-a1c5518c4732' }
      ]
    }
  });

  // imageUploader
  //   .on('sizeerror', () => console.log('sizeerror'));

  // imageUploader
  //   .on('typeerror', () => console.log('typeerror'));

  // imageUploader
  //   .on('fail', () => alert('fail'));

  const dateRange = new DateRangeSelect({
    el: '#date-range-select .items'
  });

  dateRange
    .on('change:value', ({ start, end }) => console.log('onchange', start, end));

  const popover = new Ractive({
    el: '#popover .items',
    append: true,
    template: tsml`
      <div class="popover-trigger btn btn-primary" on-click="toggle('active')">
        Click
      </div>

      <Popover anchor={{anchor}} active={{active}}>
        <div>123</div>
      </Popover>
    `,
    components: { Popover },
    data: {
      anchor: null,
      active: false
    },
    onrender() {
      this.set({
        anchor: this.find('.popover-trigger')
      });
    }
  });

  const fileUploader = new FileUploader({
    el: '#file-uploader .items',
    data: {
      files: [
        { name: 'mefive', url: 'ssss', progress: 40 },
        { name: 'mm', url: 'ssss' }
      ],
      uploadUrl: '/upload/images'
    }
  });

  $('#modal .btn[data-type="scrollable"]')
    .on('click', () => {
      new Ractive({
        el: 'body',
        append: true,
        components: { Modal, Scrollable },
        template: tsml`
          <Modal title={{title}} className="showcase" custom>
            {{#if versions.length > 0}}
            <Scrollable height=400>
              <ul>
                {{#versions}}
                <li>
                  <div class="version">
                    <strong>{{version}}</strong>
                    <span>更新时间：{{modify}}</span>
                  </div>
                </li>
                {{/}}
              </ul>
            </Scrollable>
            {{/if}}
          </Modal>
        `,
        data: {
          title: '版本信息',
          versions: (() => {
            const rt = [];

            for (let i = 0; i < 100; i++) {
              rt.push({ 
                version: 'v3.7.4.2', modify: '2015-05-01', 
                message: '1. 支持https安全日志'
              });
            }

            return rt;
          })()
        }
      });
    });

  $('#modal [data-type="form"]')
    .on('click', () => {
      const formModal = new Ractive({
        el: 'body',
        append: true,
        components: { Modal, Form },
        template: tsml`
          <Modal title={{title}} custom className="form-modal">
            <Form fields={{fields}} labelWidth=100 />
            <div class="form-actions">
              <div class="btn btn-primary" on-click="submit">
                Submit
              </div>
            </div>
          </Modal>
        `,
        data: {
          title: 'Form',
          fields: [
            { name: 'desc', type: 'textarea', label: '应用简介', maxLength: 3, value: 'some brife desc', required: true },
            { name: 'password', type: 'password', label: '密码', required: true },
            { name: 'test', type: 'container', label: '容器', required: true }
          ]
        }
      });

      const test = new Ractive({
        el: '.form-modal [name="test"]',
        template: tsml`
          <div>123</div>
          <label>
            <input type="checkbox" checked={{checked}} />
            &nbsp;&nbsp;&nbsp;Check
          </label>
        `,
        data: {
          checked: false
        }
      });

      formModal
        .on('submit', () => {
          const form = formModal.findComponent('Form');
          form.validate();          
          console.log('submit', test.get('checked'));
        });
    });

  // const Tooltip = new Ractive({
  //   append: true,
  //   el: '#tool-tip .items',
  //   template: tsml`
  //     <Tooltip placement="topLeft">
  //       <div class="btn">
  //         Top Left
  //       </div>

  //       {{#partial content}}
  //         <div>123123123123123123123</div>
  //       {{/partial}}
  //     </Tooltip>

  //     <Tooltip placement="right">
  //       <div class="btn">
  //         Right
  //       </div>

  //       {{#partial content}}
  //         <div>12312312312<br />3123123123</div>
  //       {{/partial}}
  //     </Tooltip>

  //     <Tooltip placement="rightTop">
  //       <div class="btn">
  //         rightTop
  //       </div>

  //       {{#partial content}}
  //         <div>12312312312<br />3123123123</div>
  //         <div>123123123123123123123</div>
  //       {{/partial}}
  //     </Tooltip>
  //   `,
  //   components: { Tooltip }
  // });

  const ttt = new Ractive({
    el: '#tool-tip .items',
    append: true,
    components: { Select },
    template: tsml`
      <ul>
        {{#list}}
        <li>
          {{title}}
          <Select options="{{options}}" on-select="select" context={{.}} />
        </li>
        {{/}}
      </ul>
    `,
    data: {
      options: platformSelect,
      list: [
        { title: 'first', name: 'nnn' },
        { title: 'second', name: 'sss' }
      ]
    }
  });

  ttt
    .on('select', (...e) => {
      console.log(e);
    });
}

init();

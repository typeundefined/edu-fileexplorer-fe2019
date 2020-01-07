/* eslint-disable */
<template>
  <div class="manager">
    <div class="row">
      <div class="col-md-6">
        <table class="table file-manager">
          <thead>
            <tr>
              <th scope="col" colspan="2">
                <div class="form-row">
                  <div class="col input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="icon-search"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      v-model="search"
                      placeholder="folder or file name"
                    />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="typeof parent.length !== 'undefined' && parent.length"
              @click="upFromFolder()"
            >
              <td width="5%">
                <i class="icon-folder-open-alt icon-large pointer"></i>
              </td>
              <td class="pointer">/{{ parent.join('/') }}</td>
            </tr>
            <tr v-for="folder in result.folders" :key="folder.name" @click="getFromFolder(folder.name)">
              <td width="5%">
                <i class="icon-folder-close-alt icon-large pointer"></i>
              </td>
              <td class="pointer">{{ folder.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <table class="table file-manager">
          <thead>
            <tr>
              <th scope="col" colspan="2" class="without-search"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in result.files" :key="file.name">
              <td width="5%">
                <i class="icon-file-alt icon-large"></i>
              </td>
              <td>{{ file.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manager',
  data () {
    return {
      parent: [],
      folders: {},
      files: {},
      result: {
        folders: {},
        files: {}
      },
      search: ''
    }
  },
  components: {},
  watch: {
    search: function (val) {
      if (Object.keys(this.folders).length) {
        this.result.folders = this.folders.filter(folder =>
          folder.name.includes(val)
        )
      }
      if (Object.keys(this.files).length) {
        this.result.files = this.files.filter(file => file.name.includes(val))
      }
    },
    $route (to, from) {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.folders = {}
      this.files = {}
      this.result.folders = {}
      this.result.files = {}
      this.search = ''

      let path = ''
      if (typeof this.parent.length !== 'undefined' && this.parent.length) {
        path = '/' + this.parent.join('/')
      }

      this.$axios
        .get(`http://localhost:8080/api/directory${path}`)
        .then(response => {
          this.folders = response.data.subDirectories
          this.files = response.data.files
          this.result.folders = response.data.subDirectories
          this.result.files = response.data.files
        })
    },
    getFromFolder (name) {
      this.parent.push(name)
      this.getData()
    },
    upFromFolder () {
      if (typeof this.parent.length !== 'undefined' && this.parent.length) {
        this.parent.pop()
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
#app .manager {
  text-align: left;
}
.pointer {
  cursor: pointer;
}
.without-search {
  height: 63px;
}
</style>

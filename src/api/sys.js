import request from '@/utils/request'

export function winFoData() {
  return request({
    url: 'system/init',
    method: 'post'
  })
}

export function doWebInfo(data) {
    return request({
      url: 'system/doWebInfo',
      method: 'post',
      data
    })
  }

export function slide(data) {
  return request({
    url: 'system/slide',
    method: 'post',
    data
  })
}

export function updateTableData(data) {
  return request({
    url: 'system/updateSlide',
    method: 'post',
    data
  })
}

export function editSlideInfo(data) {
  return request({
    url: 'system/editSlideInfo',
    method: 'post',
    data
  })
}

export function addSlideInfo(data) {
  return request({
    url: 'system/addSlideInfo',
    method: 'post',
    data
  })
}
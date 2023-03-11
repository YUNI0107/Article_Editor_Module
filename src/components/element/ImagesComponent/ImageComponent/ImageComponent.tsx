import { useMemo, useContext } from 'react'
import classNames from 'classnames'

// types
import { IComponentSchema, IImage, imagesType } from '../../../../types/editor'

// contexts
import { EditorInfoContext } from '../../../../contexts/EditorInfoContextSection'
import BasicEditorContent from '../../../text/BasicEditorContent'

// components
import AddImageButton from '../../../common/AddImageButton'
import ImgPathControl from '../../../controls/ImgPathControl'
import CircleButton from '../../../common/CircleButton'

// utils
import { urlValidate } from '../../../../validator/commonValidate'

function ImageComponent({
  schema,
  type,
  parentSchema,
  popupShowHandler,
  isEditorMode,
  setIsModalShow,
}: {
  schema: IImage
  type: imagesType
  parentSchema?: IComponentSchema
  popupShowHandler: () => void
  isEditorMode: boolean
  setIsModalShow?: (isShow: boolean) => void
}) {
  const { previewMode } = useContext(EditorInfoContext)

  const { props, uuid } = schema || {}
  const { uuid: parentUuid } = parentSchema || {}
  const { filter: filterStyleClass, textShowChecks } = props || {}

  const pathControlUuidMap = parentUuid
    ? {
        uuid: parentUuid,
        childUuid: uuid,
      }
    : {
        uuid: uuid,
      }

  const imageRatio = useMemo(() => {
    switch (type) {
      case 'triplicate-square':
      case 'triplicate-circle':
      case 'double-square':
      case 'double-circle':
        return '100%'
      case 'triplicate-rectangle':
      case 'double-rectangle':
        return '60%'
      default:
        return '100%'
    }
  }, [])

  // operations
  const openImageModal = () => {
    if (!setIsModalShow || props?.clickEvent !== 'image-popup' || isEditorMode) return
    setIsModalShow(true)
  }

  return (
    <div>
      <div
        className={classNames('relative group', {
          'cursor-pointer': props?.clickEvent === 'image-popup',
        })}
        style={{ paddingTop: imageRatio }}
        onClick={openImageModal}
      >
        <img
          className={classNames(
            'z-10 absolute top-0 left-0 w-full h-full object-cover',
            filterStyleClass
          )}
          src={props?.imgPath}
        />

        {props?.linkUrl &&
          urlValidate(props.linkUrl) &&
          props?.clickEvent === 'link' &&
          !isEditorMode && (
            <a
              href={props.linkUrl}
              className="z-30 w-full h-full absolute top-0 left-0"
              target="_blank"
              rel="noreferrer"
            ></a>
          )}

        <div
          className={classNames(
            'z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col hidden justify-center items-center ',
            {
              'group-hover:flex': isEditorMode,
            }
          )}
        >
          <AddImageButton
            onClick={popupShowHandler}
            text="變更圖片"
            customClassNames="mb-2 py-2 px-4"
            isPreviewSmMode={previewMode === 'sm'}
          >
            <ImgPathControl
              uuid={pathControlUuidMap.uuid}
              childUuid={pathControlUuidMap.childUuid}
            />
          </AddImageButton>

          <CircleButton
            onClick={popupShowHandler}
            iconTag="ri-settings-3-fill"
            isPreviewSmMode={previewMode === 'sm'}
            dataType="popupEdit"
          />
        </div>
      </div>

      {parentSchema && (textShowChecks?.title || textShowChecks?.description) && (
        <div className="flex flex-col justify-center items-center mt-5">
          {/* title */}
          {textShowChecks?.title && (
            <div className="mb-2">
              <BasicEditorContent
                schema={parentSchema}
                childUuid={schema.uuid}
                controlName="title"
              />
            </div>
          )}

          {/* description */}
          {textShowChecks?.description && (
            <BasicEditorContent
              schema={parentSchema}
              childUuid={schema.uuid}
              controlName="description"
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ImageComponent

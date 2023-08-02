import styles from "./registerModal.module.sass"

import CloseIcon from "/public/icons/xmark.svg"
import DownIcon from "/public/icons/chevron.down.svg"
import UpIcon from "/public/icons/chevron.up.svg"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import Success from "../success/success"

export default function RegisterModal({ setIsRegisterModal }) {

  const [isSuccessModal, setIsSuccessModal] = useState(false)
  const [options, setOptions] = useState(["UI/UX Designer", "Project Manager", "Creative Technologist", "3D Prototyper"])

  const [activeOption, setActiveOption] = useState(null)

  const modalRef = useRef(null)
  const containerRef = useRef(null)
  const onCloseModal = () => {

    modalRef.current.classList.add(styles.hide)
    containerRef.current.classList.add(styles.hide)

    setTimeout(() => {
      setIsRegisterModal(false)
    }, 250)
  }

  const handleWrapperClick = (e) => onCloseModal()
  const handleModalClick = (e) => e.stopPropagation()

  return (
    <>
      <div ref={modalRef} className={styles.modalBackground} onClick={handleWrapperClick}>
        <div ref={containerRef} className={styles.container} onClick={handleModalClick}>

          <div className={styles.header}>
            <div className={styles.title}>Registration Form</div>
            <CloseIcon onClick={onCloseModal} />
          </div>

          <div className={styles.content}>
            <div className={styles.label}>Personal Info</div>
            <TextInput placeholder="Full name" />
            <TextInput placeholder="example@gmail.com" />
            <TextInput placeholder="Phone number" type="number" />

            <div className={styles.footerText}>The project lead will connect with you according to your contact information.</div>


            <div className={styles.label}>Designated role in this project</div>
            <DropDown options={options} setOptions={setOptions} activeOption={activeOption} setActiveOption={setActiveOption} type={1} />
            <DropDown options={options} setOptions={setOptions} activeOption={activeOption} setActiveOption={setActiveOption} type={2} />
            <div className={styles.footerText}>The selected roles are not guaranteed, the team leads will try their best to accommodate.</div>

            <div className={styles.label}>More about you</div>
            <TextArea />

            <div className={styles.button} onClick={() => setIsSuccessModal(true)} >Submit</div>

          </div>
        </div>
      </div>
      {
        isSuccessModal ? <Success type="register" /> : null
      }
    </>
  )
}

function TextInput({ placeholder, type }) {
  const [input, setInput] = useState('')
  const onInputChange = (e) => {
    setInput(e.target.value)

    if (type === "number") {
      const curInput = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters

      let formattedNumber = "";
      if (curInput.length > 0) {
        formattedNumber += `(${curInput.slice(0, 3)}`;
        if (curInput.length > 3) {
          formattedNumber += `) ${curInput.slice(3, 6)}`;
          if (curInput.length > 6) {
            formattedNumber += `-${curInput.slice(6, 10)}`;
          }
        }
      }
      console.log('for', formattedNumber)
      setInput(formattedNumber)
    }



  }

  return (
    <input className={styles.input} type="text" placeholder={placeholder} value={input} onChange={onInputChange} />
  )
}

function DropDown({ options, setOptions, type, activeOption, setActiveOption }) {

  const [selectedOption, setSelectedOption] = useState(null)

  const handleOnTextClick = () => {
    if (activeOption === type) setActiveOption(null)
    else setActiveOption(type)
  }

  const handleOnOptionClick = (e) => {
    e.target.classList.add(styles.selected)

    const curSelectedOption = e.target.id
    let newOptions = [...options]

    // push old option into array as there's a new one
    if (selectedOption) newOptions.push(selectedOption)

    // removes selected option from array
    const foundIndex = newOptions.indexOf(curSelectedOption)
    newOptions.splice(foundIndex, 1)

    setTimeout(() => {
      setOptions(newOptions)
      setSelectedOption(curSelectedOption)
      setActiveOption(null)
    }, 50)
  }

  let dropdownOptions = []
  options.forEach((option) => {
    dropdownOptions.push(<div id={option} className={styles.option} onClick={handleOnOptionClick}>{option}</div>)
  })


  let dropDownContainerClass = [styles.dropdownContainer]
  if (activeOption === type) dropDownContainerClass = [dropDownContainerClass, styles.isOptions].join(' ')

  return (
    <div className={dropDownContainerClass}>
      <div className={styles.textContainer} onClick={handleOnTextClick}>
        {
          selectedOption ? selectedOption
            :
            <span className={styles.placeholder}>
              {type === 1 ? "1st Choice" : "2nd Choice"}
            </span>
        }
        {
          activeOption === type ? <UpIcon /> : <DownIcon />
        }
      </div>
      {
        activeOption === type ?
          <div className={styles.optionsContainer}>
            {dropdownOptions}
          </div>
          : null
      }
    </div>
  )

}

function TextArea() {
  const [input, setInput] = useState('')
  const onInputChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <textarea className={styles.textArea} value={input} onChange={onInputChange} placeholder="Tell us a bit more about you!" rows={+6} />
  )
}
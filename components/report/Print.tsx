import jsPDF from 'jspdf'
// import 'jspdf-autotable';
// import autoTable from 'jspdf-autotable'
import moment from 'moment'
import Logo from 'Images/logo.png'

const PrintData = (data: any) => {
  console.log(data)
  const doc = new jsPDF('p', 'pt', 'a4')
  const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
  let totalAmount = 0
  const percentage = 15
  const discount = (data[8] * percentage) / 100
  const discountPrice = data[8] - discount
  const tableColumns: string[] = ['S.No.', 'Item Name', 'Qty', 'Rate', 'Total']
  const tableRows: any[] = [] // You can define the type for tableRows as per your data structure

  doc.setFontSize(20)

  doc.text(`All star driving school`, doc.internal.pageSize.width / 2, 50, {
    align: 'center',
  })

  doc.setFontSize(10)

  doc.setFontSize(10)
  doc.setFont('normal')
  doc.setFontSize(15)
  doc.text(`Instructor payment Details`, pageWidth - 550, 80, {})

  let yPos = 100

  // autoTable(doc, {
  //   head: [['Username', 'Room', 'Check in Date', 'Checkout Date', 'Status']],
  //   body: [[data[1], data[2], data[3], data[4], data[7]]],
  //   startY: yPos,
  // })

  // autoTable(doc, {
  //   head: [['No of Adults', 'Total Guests', 'Total Price', 'Special Request']],
  //   body: [[data[5], data[6], data[8], data[9]]],
  //   startY: yPos + 50,
  // })

  yPos += 100
  doc.setFont('bold')
  // doc.addImage(Logo, 'PNG', 33, 22, 305, 84)
  doc.setFontSize(10)
  doc.setFont('normal')
  doc.setFontSize(10)
  yPos -= 20

  yPos += 70
  doc.text(`Discount: `, pageWidth - 190, yPos, {
    align: 'right',
  })
  doc.text(`15%`, pageWidth - 40, yPos, {
    align: 'right',
  })
  yPos += 20
  doc.text(`Price After Discount: `, pageWidth - 145, yPos, {
    align: 'right',
  })
  doc.text(`${discountPrice}`, pageWidth - 40, yPos, {
    align: 'right',
  })

  yPos += 20
  doc.text(`Date Printed:`, pageWidth - 180, yPos, {
    align: 'right',
  })
  doc.text(`__________________`, pageWidth - 30, yPos, {
    align: 'right',
  })
  doc.text(`${moment().format('DD-MM-YYYY hh:mm:ss a')}`, pageWidth - 40, yPos, {
    align: 'right',
  })
  doc.setFontSize(12)

  doc.setFontSize(24)
  doc.setFont('arial')
  //   doc.setFont(undefined, 'bold');

  doc.setFontSize(10)
  doc.setFont('arial')
  //   doc.setFont(undefined, 'bold');

  doc.setFontSize(10)
  doc.setFont('normal')
  //   doc.setFont(undefined, 'normal');

  //   const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(12)
  doc.setTextColor(129, 90, 164) // RGB values for #815AA4

  //   for (let i = 1; i <= pageCount; i += 1) {
  // doc.setPage(i);
  doc.text(
    `w w w . t h e a v e n u e h o t e l . p k`,
    doc.internal.pageSize.width / 2,
    doc.internal.pageSize.height - 20,
    {
      align: 'center',
    },
  )

  // doc.text(
  //   `Page   ${i} of  ${pageCount}`,
  //   doc.internal.pageSize.width - 80,
  //   doc.internal.pageSize.height - 10,
  // );
  //   }
  doc.setFontSize(10)

  //   If you want to save the PDF or print it, you can use the following:
  //   doc.save('voucher.pdf');
  //   doc.autoPrint();
  window.open(doc.output('bloburl'), '_blank')
}

export default PrintData

#lang racket

;; (define (findel set cond)
;; 	(filter (lambda (arg) (eq? arg cond) ) set)
;;   )
;;
;; (null? (sus (list 1 2 3 4) 0))
(define (inSet num set)
	(if (memq num set) #t #f)
  )

(define (dedupe e)
  (if (null? e) '()
      (cons (car e) (dedupe (filter (lambda (x) (not (equal? x (car e)))) 
                                    (cdr e))))))

(inSet 2 '(2 3 4))
(inSet (car '(2)) '(2 3 4))

(dedupe '(2 2 3 4))

(define (uni set1 set2)
  (dedupe (append set1 set2))
  )

(uni '(2 3 4) '(3 4 5))
(uni '() '(3 4 5))

(define (intersect a b)
  (if (null? a)
      '()
      (if (inSet (car a) b)
          (cons (car a) (intersect (cdr a) b))
		  (intersect (cdr a) b))))

(define (diff a b)
	(if (null? a)
	  '()
		(if (inSet (car a) (intersect a b) )
			(diff (cdr a) b)
		  	(cons (car a) (diff (cdr a) b))
		  )
	  )
  )
  

(define (sym-diff a b)
	(diff (uni a b) (intersect a b))
  )

(intersect '(2 3 4) '(3 4 5))

(diff '(2 5 8 3 4) '(3 4 5))

(diff '(2 5 8 3 4) '(3 4 5 11))

(uni '(2 5 8 3 4) '(3 4 5 11))

(sym-diff '(2 5 8 3 4) '(3 4 5 11))
